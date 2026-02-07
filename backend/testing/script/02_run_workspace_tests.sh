#!/bin/sh

BASE_URL="http://localhost:3001"
USER_ID="5c26f661-1b73-4387-b4dc-cb379fe29ccd"
TENANT_ID="80e8a565-2af4-43c7-bdb3-285ae5f9285b"

OUTPUT_MD="./backend/testing/result/02_workspace_test_result.md"
OUTPUT_HTML="./backend/testing/result/02_workspace_test_result.html"

# Expected status codes
expected_status() {
  case "$1" in
    WSP-000) echo 200 ;;   # Preconditions
    WSP-001) echo 201 ;;   # Create workspace
    WSP-002) echo 409 ;;   # Duplicate name
    WSP-003) echo 200 ;;   # Retrieve workspace
    WSP-004) echo 200 ;;   # List workspaces
    WSP-005) echo 200 ;;   # Update workspace
    WSP-006) echo 200 ;;   # Delete workspace
    WSP-007) echo 403 ;;   # Cross-workspace isolation
    WSP-008) echo 403 ;;   # Assistant boundary
    WSP-009) echo 403 ;;   # Reference boundary
    WSP-010) echo 403 ;;   # Workflow boundary
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

# WSP-000 — Preconditions
run_test "WSP-000" "Preconditions: user + tenant exist" \
"curl -i -X GET $BASE_URL/users/$USER_ID"

# WSP-001 — Create workspace
run_test "WSP-001" "Create workspace" \
"curl -i -X POST $BASE_URL/workspaces \
  -H 'Content-Type: application/json' \
  -H 'X-Tenant-ID: $TENANT_ID' \
  -d '{\"ownerId\":\"$TENANT_ID\",\"name\":\"Main Workspace\",\"metadata\":{\"purpose\":\"general\"}}'"

# WSP-002 — Duplicate workspace name
run_test "WSP-002" "Create workspace with duplicate name" \
"curl -i -X POST $BASE_URL/workspaces \
  -H 'Content-Type: application/json' \
  -H 'X-Tenant-ID: $TENANT_ID' \
  -d '{\"ownerId\":\"$TENANT_ID\",\"name\":\"Main Workspace\"}'"

# WSP-003 — Retrieve workspace
run_test "WSP-003" "Retrieve workspace" \
"curl -i -X GET $BASE_URL/workspaces/{workspace_id} \
  -H 'X-Tenant-ID: $TENANT_ID'"

# WSP-004 — List workspaces
run_test "WSP-004" "Retrieve workspace list" \
"curl -i -X GET \"$BASE_URL/workspaces?ownerId=$TENANT_ID\" \
  -H 'X-Tenant-ID: $TENANT_ID'"

# WSP-005 — Update workspace
run_test "WSP-005" "Update workspace name" \
"curl -i -X PATCH $BASE_URL/workspaces/{workspace_id} \
  -H 'Content-Type: application/json' \
  -H 'X-Tenant-ID: $TENANT_ID' \
  -d '{\"name\":\"Updated Workspace Name\"}'"

# WSP-006 — Delete workspace
run_test "WSP-006" "Delete workspace" \
"curl -i -X DELETE $BASE_URL/workspaces/{workspace_id} \
  -H 'X-Tenant-ID: $TENANT_ID'"

# WSP-007 — Cross-workspace isolation
run_test "WSP-007" "Cross-workspace isolation" \
"curl -i -X GET $BASE_URL/workspaces/{workspace_b_id} \
  -H 'X-Tenant-ID: {workspace_a_ownerId}'"

# WSP-008 — Assistant boundary
run_test "WSP-008" "Workspace boundary on assistants" \
"curl -i -X GET $BASE_URL/assistants/{assistant_id} \
  -H 'X-Workspace-ID: {workspace_other_id}'"

# WSP-009 — Reference boundary
run_test "WSP-009" "Workspace boundary on references" \
"curl -i -X GET $BASE_URL/references/{reference_id} \
  -H 'X-Workspace-ID: {workspace_other_id}'"

# WSP-010 — Workflow boundary
run_test "WSP-010" "Workspace boundary on workflows" \
"curl -i -X POST $BASE_URL/workflows/{workflow_id}/execute \
  -H 'X-Workspace-ID: {workspace_other_id}'"

echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
