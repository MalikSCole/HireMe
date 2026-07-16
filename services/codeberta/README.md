# CodeBERTa optimization classifier

This service loads a **fine-tuned sequence-classification checkpoint** and exposes it to the web application. Do not point `CODEBERTA_MODEL_ID` at the base `microsoft/codebert-base` checkpoint: its classification head is not trained for optimization labels.

Expected labels should describe solution quality, for example `optimal`, `acceptable`, and `needs_optimization`. The service sends the problem statement, learner code, and deterministic AST features to the classifier.

```bash
docker build -t hireme-codeberta services/codeberta
docker run --rm -p 8001:8001 \
  -e CODEBERTA_MODEL_ID=your-org/your-fine-tuned-codeberta \
  -e CODEBERTA_API_KEY=replace-me \
  hireme-codeberta
```

Set matching `CODEBERTA_URL` and `CODEBERTA_API_KEY` values in the web application. Keep this service private; the UI automatically falls back to AST-only feedback if it is unavailable.
