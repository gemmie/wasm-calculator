#define WASM_EXPORT __attribute__((visibility("default")))

WASM_EXPORT
int main() {
  return 42;
}

WASM_EXPORT
int add(int a, int b) {
  return a + b;
}

WASM_EXPORT
int subtract(int a, int b) {
  return a - b;
}

WASM_EXPORT
int multiply(int a, int b) {
  return a * b;
}

WASM_EXPORT
int divide(int a, int b) {
  return a / b;
}