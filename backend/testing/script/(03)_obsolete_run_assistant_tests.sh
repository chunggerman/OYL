#!/bin/sh

BASE_URL="http://localhost:3001"
WORKSPACE_ID="b046191a-72a4-4aec-a854-bf732f9b3297"

OUTPUT_MD="./backend/testing/result/03_assistant_test_result.md"
OUTPUT_HTML="./backend/testing/result/03_assistant_test_result.html"

expected_status() {
  case "$1" in
    AST-001) echo 201 ;;
    AST-002) echo 400 ;;
    AST-003) echo 400 ;;
    AST-004) echo 200 ;;
    AST-005) echo 200 ;;
    AST-006) echo 200 ;;
    AST-007) echo 200 ;;
    AST-008) echo 200 ;;
  esac
}

echo "# Assistant Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Assistant Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

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

  echo "## $ID — $NAME" >> "$OUTPUT_MD"
  echo "**Expected:** $EXPECTED" >> "$OUTPUT_MD"
  echo "**Actual:** $STATUS" >> "$OUTPUT_MD"
  echo "**Result:** $RESULT" >> "$OUTPUT_MD"
  echo "" >> "$OUTPUT_MD"
  echo "### Request" >> "$OUTPUT_MD"
  echo "\`\`\`bash" >> "$OUTPUT_MD"
  echo "$CMD" >> "$OUTPUT_MD"
  echo "\`\`\`" >> "$OUTPUT_MD"
  echo "" >> "$OUTPUT_MD"
  echo "### Response" >> "$OUTPUT_MD"
  echo "\`\`\`" >> "$OUTPUT_MD"
  echo "$RESPONSE" >> "$OUTPUT_MD"
  echo "\`\`\`" >> "$OUTPUT_MD"
  echo "" >> "$OUTPUT_MD"

  echo "<h2>$ID — $NAME</h2>" >> "$OUTPUT_HTML"
  echo "<p><b>Expected:</b> $EXPECTED<br>" >> "$OUTPUT_HTML"
  echo "<b>Actual:</b> $STATUS<br>" >> "$OUTPUT_HTML"
  echo "<b>Result:</b> $RESULT_HTML</p>" >> "$OUTPUT_HTML"
  echo "<h3>Request</h3><pre>$CMD</pre>" >> "$OUTPUT_HTML"
  echo "<h3>Response</h3><pre>$RESPONSE</pre>" >> "$OUTPUT_HTML"
}

AST001_CMD="curl -i -X POST $BASE_URL/assistants \
  -H 'Content-Type: application/json' \
  -d '{\"workspace_id\":\"$WORKSPACE_ID\",\"name\":\"General Assistant\",\"instruction\":\"You are a helpful assistant.\",\"settings\":{\"temperature\":0.7}}'"

ASSISTANT_ID=$(eval "$AST001_CMD" 2>&1 | grep -oE '"id":"[^"]+' | cut -d'"' -f4)

run_test "AST-001" "Create assistant" "$AST001_CMD"

run_test "AST-002" "Missing instruction" \
"curl -i -X POST $BASE_URL/assistants -H 'Content-Type: application/json' -d '{\"workspace_id\":\"$WORKSPACE_ID\",\"name\":\"Bad Assistant\",\"instruction\":\"\"}'"

BIG_INSTRUCTION=$(printf 'x%.0s' $(seq 1 12000))

run_test "AST-003" "Instruction too long" \
"curl -i -X POST $BASE_URL/assistants -H 'Content-Type: application/json' -d '{\"workspace_id\":\"$WORKSPACE_ID\",\"name\":\"Overflow Assistant\",\"instruction\":\"$BIG_INSTRUCTION\"}'"

run_test "AST-004" "Get assistant" \
"curl -i -X GET $BASE_URL/assistants/$ASSISTANT_ID"

run_test "AST-005" "List assistants" \
"curl -i -X GET \"$BASE_URL/assistants?workspace_id=$WORKSPACE_ID\""

run_test "AST-006" "Update instruction" \
"curl -i -X PATCH $BASE_URL/assistants/$ASSISTANT_ID -H 'Content-Type: application/json' -d '{\"instruction\":\"Updated instruction text.\"}'"

run_test "AST-007" "Update settings" \
"curl -i -X PATCH $BASE_URL/assistants/$ASSISTANT_ID -H 'Content-Type: application/json' -d '{\"settings\":{\"temperature\":0.3,\"top_p\":0.9}}'"

run_test "AST-008" "Delete assistant" \
"curl -i -X DELETE $BASE_URL/assistants/$ASSISTANT_ID"

echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
EOF
