#!/bin/bash

echo "🚀 Iniciando ServeRest..."
npx serverest --no-open &
SERVEREST_PID=$!

# Aguarda o servidor iniciar
sleep 3

echo "🧪 Executando testes..."
npx jest "$@"
TEST_RESULT=$?

echo "🛑 Encerrando ServeRest..."
kill $SERVEREST_PID 2>/dev/null || true
wait $SERVEREST_PID 2>/dev/null || true

exit $TEST_RESULT
