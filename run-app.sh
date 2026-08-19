#!/usr/bin/env bash
# Abre o 100toGo como uma janela de app própria (sem abas/barra de endereço),
# arrancando um servidor local se ainda não estiver a correr.
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=8791
URL="http://localhost:${PORT}"
PROFILE_DIR="${APP_DIR}/brave-profile"

started_server=0
SERVER_PID=""

cleanup() {
  if [ "${started_server}" -eq 1 ] && [ -n "${SERVER_PID}" ]; then
    kill "${SERVER_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if ! curl -sf "${URL}" >/dev/null 2>&1; then
  python3 -m http.server "${PORT}" --directory "${APP_DIR}" >/tmp/100togo-server.log 2>&1 &
  SERVER_PID=$!
  started_server=1

  for _ in $(seq 1 25); do
    if curl -sf "${URL}" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

mkdir -p "${PROFILE_DIR}"

brave --app="${URL}" \
  --user-data-dir="${PROFILE_DIR}" \
  --class=100toGo \
  --window-size=1120,780
