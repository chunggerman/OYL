#!/bin/sh

BASE_URL="http://localhost:3001"
USER_ID="5c26f661-1b73-4387-b4dc-cb379fe29ccd"
TENANT_ID="80e8a565-2af4-43c7-bdb3-285ae5f9285b"

OUTPUT_MD="./backend/testing/result/01_tenant_test_result.md"
OUTPUT_HTML="./backend/testing/result/01_tenant_test_result.html"

# Expected status codes
expected_status() {
  case "$1" in
    TEN-000) echo 200 ;;   # GET existing user
    TEN-001) echo 200 ;;   # GET existing tenant
    TEN-002) echo 400 ;;
    TEN-003) echo 400 ;;
    TEN-004) echo 200 ;;
    TEN-005) echo 404 ;;
    TEN-006) echo 200 ;;
    TEN-007) echo 200 ;;
    TEN-008) echo 200 ;;
    TEN-009) echo 403 ;;
    TEN-010) echo 403 ;;
  esac
}

# Initialize reports
echo "# Tenant Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Tenant Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

run_test() {
  ID="$1"
  NAME="$2"
  CMD="$3"

  EXPECTED=$(expected_status "$ID")
  RESPONSE=$(eval "$CMD" 2>&1)

  # FIXED: Extract the first HTTP status line
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

run_test "TEN-000" "Create user (existing user reused)" \
"curl -i -X GET $BASE_URL/users/$USER_ID"

run_test "TEN-001" "Create tenant (existing tenant reused)" \
"curl -i -X GET $BASE_URL/tenants/$TENANT_ID"

run_test "TEN-002" "Missing tenant name" \
"curl -i -X POST $BASE_URL/tenants -H 'Content-Type: application/json' -d '{\"name\":\"\",\"ownerId\":\"$USER_ID\"}'"

BIG_META=$(printf 'x%.0s' $(seq 1 12000))

run_test "TEN-003" "Oversized metadata" \
"curl -i -X POST $BASE_URL/tenants -H 'Content-Type: application/json' -d '{\"name\":\"BigMeta\",\"ownerId\":\"$USER_ID\",\"metadata\":{\"blob\":\"$BIG_META\"}}'"

run_test "TEN-004" "Get tenant" \
"curl -i -X GET $BASE_URL/tenants/$TENANT_ID"

run_test "TEN-005" "Get non-existent tenant" \
"curl -i -X GET $BASE_URL/tenants/00000000-0000-0000-0000-000000000000"

run_test "TEN-006" "Update tenant name" \
"curl -i -X PATCH $BASE_URL/tenants/$TENANT_ID -H 'Content-Type: application/json' -d '{\"name\":\"New Tenant Name\"}'"

run_test "TEN-007" "Update tenant metadata" \
"curl -i -X PATCH $BASE_URL/tenants/$TENANT_ID -H 'Content-Type: application/json' -d '{\"metadata\":{\"plan\":\"enterprise\"}}'"

run_test "TEN-008" "Delete tenant" \
"curl -i -X DELETE $BASE_URL/tenants/$TENANT_ID"

run_test "TEN-009" "Cross-tenant isolation" \
"curl -i -X GET $BASE_URL/tenants/$TENANT_ID -H 'X-Tenant-ID: 00000000-0000-0000-0000-000000000001'"

run_test "TEN-010" "Tenant boundary on nested objects" \
"curl -i -X GET $BASE_URL/workspaces/00000000-0000-0000-0000-000000000999 -H 'X-Tenant-ID: 00000000-0000-0000-0000-000000000001'"

echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
