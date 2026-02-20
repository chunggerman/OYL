# backend/testing/04_document_processing_test.sh
#!/bin/sh

BASE_URL="http://localhost:3001"

WORKSPACE_A_ID="a9485bec-cfa2-4cdc-aec1-e748933a075b"
WORKSPACE_B_ID="b046191a-72a4-4aec-a854-bf732f9b3297"

OUTPUT_MD="./backend/testing/result/04_document_processing_test_result.md"
OUTPUT_HTML="./backend/testing/result/04_document_processing_test_result.html"

mkdir -p ./backend/testing/result
mkdir -p ./backend/testing/sample

###############################################
# Expected status mapping
###############################################
expected_status() {
  case "$1" in
    DOC-000) echo 201 ;;
    DOC-001) echo 400 ;;
    DOC-002) echo 400 ;;
    DOC-003) echo 400 ;;
    DOC-004) echo 413 ;;
    DOC-005) echo 500 ;;
    DOC-006) echo 200 ;;
    DOC-007) echo 200 ;;
    DOC-008) echo 403 ;;
    DOC-009) echo 200 ;;
    DOC-010) echo 403 ;;
  esac
}

###############################################
# Output headers
###############################################
echo "# Document Processing Test Results" > "$OUTPUT_MD"
echo "Generated: $(date)\n" >> "$OUTPUT_MD"

echo "<html><body><h1>Document Processing Test Results</h1><p>Generated: $(date)</p>" > "$OUTPUT_HTML"

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
# BOOTSTRAP: ensure virus.exe exists
###############################################
touch backend/testing/sample/virus.exe

###############################################
# BOOTSTRAP: upload a document for DOC‑006 → DOC‑010
###############################################
BOOTSTRAP_UPLOAD=$(curl -s -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload \
  -H "X-Workspace-ID: $WORKSPACE_A_ID" \
  -F "file=@./backend/testing/sample/firefighting_and_rescue.pdf")

DOCUMENT_ID=$(echo "$BOOTSTRAP_UPLOAD" | grep '"id"' | head -1 | sed 's/.*"id":"\([^"]*\)".*/\1/')

###############################################
# TESTS
###############################################

run_test "DOC-000" "Upload valid document" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID' -F 'file=@./backend/testing/sample/firefighting_and_rescue.pdf'"

run_test "DOC-001" "Unsupported file type" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID' -F 'file=@./backend/testing/sample/virus.exe'"

run_test "DOC-002" "Missing file field" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "DOC-003" "Empty filename (debug simulation)" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID' -H 'X-Debug-Empty-Filename: true' -F 'file=@./backend/testing/sample/firefighting_and_rescue.pdf'"

run_test "DOC-004" "File too large" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID' -H 'X-Debug-Fake-Size: 999999999' -F 'file=@./backend/testing/sample/firefighting_and_rescue.pdf'"

run_test "DOC-005" "Ingestion job creation failure" \
"curl -i -X POST $BASE_URL/workspaces/$WORKSPACE_A_ID/documents/upload -H 'X-Workspace-ID: $WORKSPACE_A_ID' -H 'X-Debug-Fail-Ingestion: true' -F 'file=@./backend/testing/sample/firefighting_and_rescue.pdf'"

run_test "DOC-006" "Retrieve document metadata" \
"curl -i -X GET $BASE_URL/documents/$DOCUMENT_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "DOC-007" "List documents" \
"curl -i -X GET $BASE_URL/workspaces/$WORKSPACE_A_ID/documents -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "DOC-008" "Cross-workspace isolation" \
"curl -i -X GET $BASE_URL/documents/$DOCUMENT_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

run_test "DOC-009" "Delete document" \
"curl -i -X DELETE $BASE_URL/documents/$DOCUMENT_ID -H 'X-Workspace-ID: $WORKSPACE_A_ID'"

run_test "DOC-010" "Delete document from another workspace" \
"curl -i -X DELETE $BASE_URL/documents/$DOCUMENT_ID -H 'X-Workspace-ID: $WORKSPACE_B_ID'"

###############################################
# Close HTML
###############################################
echo "</body></html>" >> "$OUTPUT_HTML"

echo "Done."
echo "Markdown report saved to: $OUTPUT_MD"
echo "HTML report saved to: $OUTPUT_HTML"
