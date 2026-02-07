#!/bin/sh

BASE_URL="http://localhost:3001"
TENANT_ID="80e8a565-2af4-43c7-bdb3-285ae5f9285b"

WORKSPACE_A="a9485bec-cfa2-4cdc-aec1-e748933a075b"
WORKSPACE_B="b046191a-72a4-4aec-a854-bf732f9b3297"

OUTPUT_MD="./backend/testing/result/02_workspace_test_result.md"
OUTPUT_HTML="./backend/testing/result/02_workspace_test_result.html"

# Expected status codes
expected_status() {
  case "$1" in
    WSP-001) echo 200 ;;
    WSP-002) echo 200 ;;
    WSP-003) echo 403 ;;
    WSP-004) echo 200 ;;
    WSP-005) echo 200 ;;
    WSP-006) echo 200 ;;
    WSP-007) echo 403 ;;
  esac
}

# Initialize reports
echo "# Workspace Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Workspace Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

run_test() {
  ID="$1"
  NAME="$2"
  CMD="$3"

  EXPECTED=$(expected_status "$ID")
  RESPONSE=$(eval "$CMD" 2>&1)

  STATUS=$(echo "$RESPONSE" | grep -m1 "^HTTP" | awk '{print $2}')

  if [ "$STATUS" = "$EXPECTED" ]; then
    RESULT="PASS"
    RESULT_HTML="<span style='color:green;font-weight:bold'>PASS</span>"
  else
    RESULT="FAIL"
    RESULT_HTML="<span style='color:red;font-weight:bold'>FAIL</span>"
  fi

  # Markdown output
  echo "## $ID — $NAME" >> "$OUTPUT_MD"
  echo "**Expected:** $EXPECTED" >> "$OUTPUT_MD"
  echo "**Actual:** $STATUS" >> "$OUTPUT_MD"
  echo "**Result:** $RESULT" >> "$OUTPUT_MD"
  echo "\n### Request\n\`\`\`bash\n$CMD\n\`\`\`" >> "$OUTPUT_MD"
  echo "\n### Response\n\`\`\`\n$RESPONSE\n\`\`\`\n" >> "$OUTPUT_MD"

  # HTML output
  echo "<h2>$ID — $NAME</h2>" >> "$OUTPUT_HTML"
  echo "<p><b>Expected:</b> $EXPECTED<br>" >> "$OUTPUT_HTML"
  echo "<b>Actual:</b> $STATUS<br>" >> "$OUTPUT_HTML"
  echo "<b>Result:</b> $RESULT_HTML</p>" >> "$OUTPUT_HTML"
  echo "<h3>Request</h3><pre>$CMD</pre>" >> "$OUTPUT_HTML"
  echo "<h3>Response</h3><pre>$RESPONSE</pre>" >> "$OUTPUT_HTML"
}

###############################################
# TESTS
###############################################

run_test "WSP-001" "Get Workspace A" \
"curl -i $BASE_URL/workspaces/$WORKSPACE_A -H 'X-Tenant-ID: $TENANT_ID'"

run_test "WSP-002" "Get Workspace B" \
"curl -i $BASE_URL/workspaces/$WORKSPACE_B -H 'X-Tenant-ID: $TENANT_ID'"

run_test "WSP-003" "Forbidden: Wrong Tenant" \
"curl -i $BASE_URL/workspaces/$WORKSPACE_A -H 'X-Tenant-ID: 11111111-1111-1111-1111-111111111111'"

run_test "WSP-004" "Update Workspace A" \
"curl -i -X PATCH $BASE_URL/workspaces/$WORKSPACE_A -H 'Content-Type: application/json' -H 'X-Tenant-ID: $TENANT_ID' -d '{\"name\":\"Workspace A Updated\"}'"

run_test "WSP-005" "Update Workspace B" \
"curl -i -X PATCH $BASE_URL/workspaces/$WORKSPACE_B -H 'Content-Type: application/json' -H 'X-Tenant-ID: $TENANT_ID' -d '{\"description\":\"test-B-updated\"}'"

run_test "WSP-006" "Delete Workspace A" \
"curl -i -X DELETE $BASE_URL/workspaces/$WORKSPACE_A -H 'X-Tenant-ID: $TENANT_ID'"

run_test "WSP-007" "Verify Workspace A is Soft Deleted" \
"curl -i $BASE_URL/workspaces/$WORKSPACE_A -H 'X-Tenant-ID: $TENANT_ID'"

echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
