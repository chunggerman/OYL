#!/bin/sh

BASE_URL="http://localhost:3001"

TENANT_ID="80e8a565-2af4-43c7-bdb3-285ae5f9285b"
WORKSPACE_A_ID="a9485bec-cfa2-4cdc-aec1-e748933a075b"
WORKSPACE_B_ID="b046191a-72a4-4aec-a854-bf732f9b3297"

OUTPUT_MD="./backend/testing/result/03_instructions_test_result.md"
OUTPUT_HTML="./backend/testing/result/03_instructions_test_result.html"

mkdir -p ./backend/testing/result

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

echo "# Instructions Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Instructions Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

###############################################
# BOOTSTRAP: Instruction for INS‑000 → INS‑009
###############################################
INS_RESPONSE=$(curl -s -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -d '{"name":"Summarize Policy","content":"Summarize the document in 3 bullet points."}')

INSTRUCTION_ID=$(echo "$INS_RESPONSE" | jq -r '.id')

if [ -z "$INSTRUCTION_ID" ] || [ "$INSTRUCTION_ID" = "null" ]; then
  echo "❌ ERROR: Instruction bootstrap failed"
  echo "Response: $INS_RESPONSE"
  exit 1
fi

###############################################
# BOOTSTRAP: Assistant
###############################################
AST_RESPONSE=$(curl -s -X POST $BASE_URL/assistants \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -d "{\"workspaceId\":\"$WORKSPACE_A_ID\",\"name\":\"Test Assistant\"}")

ASSISTANT_ID=$(echo "$AST_RESPONSE" | jq -r '.id')

if [ -z "$ASSISTANT_ID" ] || [ "$ASSISTANT_ID" = "null" ]; then
  echo "❌ ERROR: Assistant bootstrap failed"
  echo "Response: $AST_RESPONSE"
  exit 1
fi

###############################################
# Helper: run test
###############################################
run_test() {
  ID="$1"
  NAME="$2"
  CMD="$3"

  EXPECTED=$(expected_status "$ID")
  RESPONSE=$(eval "$CMD" 2>&1)
  STATUS=$(echo "$RESPONSE" | grep "HTTP" | tail -1 | awk '{print $2}')

  if [ "$STATUS" = "$EXPECTED" ]; then
    RESULT="PASS"
    RESULT_HTML="<span style='color:green;font-weight:bold'>PASS</span>"
  else
    RESULT="FAIL"
    RESULT_HTML="<span style='color:red;font-weight:bold'>FAIL</span>"
  fi

  echo "## $ID — $NAME" >> "$OUTPUT_MD"
  echo "**Expected:** $EXPECTED" >> "$OUTPUT_MD"
  echo "**Actual:** $STATUS" >> "$OUTPUT_MD"
  echo "**Result:** $RESULT" >> "$OUTPUT_MD"
  echo "\n### Request\n\`\`\`bash\n$CMD\n\`\`\`" >> "$OUTPUT_MD"
  echo "\n### Response\n\`\`\`\n$RESPONSE\n\`\`\`\n" >> "$OUTPUT_MD"

  echo "<h2>$ID — $NAME</h2>" >> "$OUTPUT_HTML"
  echo "<p><b>Expected:</b> $EXPECTED<br>" >> "$OUTPUT_HTML"
  echo "<b>Actual:</b> $STATUS<br>" >> "$OUTPUT_HTML"
  echo "<b>Result:</b> $RESULT_HTML</p>" >> "$OUTPUT_HTML"
  echo "<h3>Request</h3><pre>$CMD</pre>" >> "$OUTPUT_HTML"
  echo "<h3>Response</h3><pre>$RESPONSE</pre>" >> "$OUTPUT_HTML"
}

###############################################
# TESTS 000 → 009 (use first instruction)
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

# INS‑005: make content empty, then refine → expect 400
run_test "INS-005" "AI-refine empty content" \
"curl -i -X PATCH $BASE_URL/instructions/$INSTRUCTION_ID -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"content\":\"\"}'; curl -i -X POST $BASE_URL/instructions/$INSTRUCTION_ID/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-006" "Retrieve instruction" \
"curl -i -X GET $BASE_URL/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-007" "List instructions" \
"curl -i -X GET $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-008" "Update instruction" \
"curl -i -X PATCH $BASE_URL/instructions/$INSTRUCTION_ID -H 'Content-Type: application/json' -H 'X-Workspace-ID: $WORKSPACE_A_ID' -d '{\"content\":\"Updated instruction text\"}'"

run_test "INS-009" "Delete instruction" \
"curl -i -X DELETE $BASE_URL/instructions/$INSTRUCTION_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

###############################################
# BOOTSTRAP: Fresh instruction for INS‑010 → 014
###############################################
INS2_RESPONSE=$(curl -s -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/instructions \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -d '{"name":"Fresh Instruction","content":"Hello"}')

INSTRUCTION2_ID=$(echo "$INS2_RESPONSE" | jq -r '.id')

###############################################
# TESTS 010 → 014 (use fresh instruction)
###############################################

run_test "INS-010" "Cross-workspace isolation" \
"curl -i -X GET $BASE_URL/instructions/$INSTRUCTION2_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

run_test "INS-011" "Link instruction to assistant" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/$INSTRUCTION2_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-012" "Link invalid instruction" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/00000000-0000-0000-0000-000000000000 -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "INS-013" "Link instruction from another workspace" \
"curl -i -X POST $BASE_URL/assistants/$ASSISTANT_ID/instructions/$INSTRUCTION2_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

run_test "INS-014" "AI-refinement engine failure" \
"curl -i -X POST $BASE_URL/instructions/$INSTRUCTION2_ID/refine -H 'X-Workspace-ID: $WORKSPACE_A_ID' -H 'X-Debug-Fail-AI: true'"

echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
