#!/bin/sh

BASE_URL="http://localhost:3001"
TENANT_ID="80e8a565-2af4-43c7-bdb3-285ae5f9285b"

OUTPUT_MD="./backend/testing/result/03_instructions_test_result.md"
OUTPUT_HTML="./backend/testing/result/03_instructions_test_result.html"

# Ensure result directory exists
mkdir -p ./backend/testing/result

###############################################
# Expected status codes
###############################################
expected_status() {
  case "$1" in
    INS-000) echo 201 ;;
    INS-001) echo 400 ;;
    INS-002) echo 400 ;;
    INS-003) echo 200 ;;
    INS-004) echo 404 ;;
    INS-005) echo 400 ;;
    INS-006) echo 200 ;;
    INS-007) echo 200 ;;
    INS-008) echo 200 ;;
    INS-009) echo 200 ;;
    INS-010) echo 403 ;;
    INS-011) echo 200 ;;
    INS-012) echo 404 ;;
    INS-013) echo 403 ;;
    INS-014) echo 500 ;;
  esac
}

###############################################
# Initialize reports
###############################################
echo "# Instructions Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Instructions Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

###############################################
# Test runner
###############################################
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
# BOOTSTRAP: Workspace A
###############################################
WSA_RESPONSE=$(curl -s -X POST $BASE_URL/tenants/$TENANT_ID/workspaces \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: $TENANT_ID" \
  -d '{"name":"Workspace A"}')

WORKSPACE_A_ID=$(echo "$WSA_RESPONSE" | jq -r '.id')

###############################################
# BOOTSTRAP: Workspace B
###############################################
WSB_RESPONSE=$(curl -s -X POST $BASE_URL/tenants/$TENANT_ID/workspaces \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: $TENANT_ID" \
  -d '{"name":"Workspace B"}')

WORKSPACE_B_ID=$(echo "$WSB_RESPONSE" | jq -r '.id')

###############################################
# BOOTSTRAP: Instruction (INS‑000)
###############################################
INS_RESPONSE=$(curl -s -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -d '{"name":"Summarize Policy","content":"Summarize the document in 3 bullet points."}')

INSTRUCTION_ID=$(echo "$INS_RESPONSE" | jq -r '.id')

###############################################
# BOOTSTRAP: Assistant
###############################################
AST_RESPONSE=$(curl -s -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/assistants \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -d '{"name":"Test Assistant"}')

ASSISTANT_ID=$(echo "$AST_RESPONSE" | jq -r '.id')

###############################################
# TESTS
###############################################

run_test "INS-000" "Create instruction" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"name\":\"Summarize Policy\",\"content\":\"Summarize the document in 3 bullet points.\"}'"

run_test "INS-001" "Missing instruction name" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"name\":\"\",\"content\":\"Valid content\"}'"

run_test "INS-002" "Missing instruction content" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"name\":\"Test\",\"content\":\"\"}'"

run_test "INS-003" "AI-refine instruction" \
"curl -i -X POST $BASE_URL/instructions/$INSTRUCTION_ID/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-004" "AI-refine invalid instruction" \
"curl -i -X POST $BASE_URL/instructions/00000000-0000-0000-0000-000000000000/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-005" "AI-refine empty content" \
"curl -i -X POST $BASE_URL/instructions/$INSTRUCTION_ID/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-006" "Retrieve instruction" \
"curl -i -X GET $BASE_URL/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-007" "List instructions" \
"curl -i -X GET $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-008" "Update instruction" \
"curl -i -X PATCH $BASE_URL/instructions/$INSTRUCTION_ID -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"content\":\"Updated instruction text\"}'"

run_test "INS-009" "Delete instruction" \
"curl -i -X DELETE $BASE_URL/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-010" "Cross-workspace isolation" \
"curl -i -X GET $BASE_URL/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

run_test "INS-011" "Link instruction to assistant" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-012" "Link invalid instruction" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/00000000-0000-0000-0000-000000000000 -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-013" "Link instruction from another workspace" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

run_test "INS-014" "AI-refinement engine failure" \
"curl -i -X POST $BASE_URL/instructions/$INSTRUCTION_ID/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID' -H 'X-Debug-Fail-AI: true'"

###############################################
# Finalize HTML
###############################################
echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
