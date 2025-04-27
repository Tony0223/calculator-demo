PROTO_DIR=proto
GEN_GO_DIR=gen/go
GEN_TS_DIR=web/src/proto

.PHONY: proto-go proto-ts

proto-go:
	protoc --go_out=$(GEN_GO_DIR) --go-grpc_out=$(GEN_GO_DIR) --connectrpc_out=$(GEN_GO_DIR) --proto_path=$(PROTO_DIR) $(PROTO_DIR)/**/*.proto

proto-ts:
	protoc --connectrpc_connect_es_out=$(GEN_TS_DIR) --proto_path=$(PROTO_DIR) $(PROTO_DIR)/**/*.proto

proto-all: proto-go proto-ts
