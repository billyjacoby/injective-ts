ROOT_DIR=./proto/indexer
BUILD_DIR=$ROOT_DIR/gen
PROTO_DIR=$ROOT_DIR/proto
TS_OUTPUT_DIR=$ROOT_DIR/proto-ts
TS_STUB_DIR=$ROOT_DIR/stub
injective_indexer_branch=dev

# remove old gen
rm -rf $BUILD_DIR
rm -rf $TS_OUTPUT_DIR
rm -rf $PROTO_DIR

########################################
######## TS PROTO GENERATION ###########
########################################
echo "Generating TS proto code..."

# make dirs
mkdir -p $BUILD_DIR
mkdir -p $TS_OUTPUT_DIR
mkdir -p $PROTO_DIR
mkdir -p $TS_OUTPUT_DIR/proto
mkdir -p $TS_OUTPUT_DIR/esm
mkdir -p $TS_OUTPUT_DIR/cjs

## Clone current proto definitions from core
git clone https://github.com/InjectiveLabs/injective-indexer.git $BUILD_DIR -b $injective_indexer_branch --depth 1 --single-branch > /dev/null

# collecting proto files
find $BUILD_DIR/api/gen/grpc -name '*.proto' -exec cp {} $PROTO_DIR \;

proto_dirs=$(find $PROTO_DIR -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)

# gen using grpc-web
npm --prefix $ROOT_DIR install
for dir in $proto_dirs; do
    proto_files=$(find "${dir}" -maxdepth 1 -name '*.proto')
    for proto_file in $proto_files; do
              protoc \
        --proto_path=${PROTO_DIR} \
        --js_out=import_style=commonjs:${TS_OUTPUT_DIR}/proto \
        --grpc-web_out=import_style=typescript,mode=grpcwebtext:${TS_OUTPUT_DIR}/proto \
        ${proto_file}
    done
done

########################################
####### POST GENERATION CLEANUP #######
########################################

echo "Compiling npm packages..."

## 4. Compile TypeScript for ESM package
cp $TS_STUB_DIR/index.ts.template $TS_OUTPUT_DIR/proto/index.ts

### ESM
cp $TS_STUB_DIR/package.json.esm.template $TS_OUTPUT_DIR/proto/package.json
cp $TS_STUB_DIR/tsconfig.json.esm.template $TS_OUTPUT_DIR/proto/tsconfig.json
npm --prefix $TS_OUTPUT_DIR/proto install
npm --prefix $TS_OUTPUT_DIR/proto run gen
cp $TS_STUB_DIR/package.json.esm.template $TS_OUTPUT_DIR/esm/package.json

### CJS
cp $TS_STUB_DIR/package.json.cjs.template $TS_OUTPUT_DIR/proto/package.json
cp $TS_STUB_DIR/tsconfig.json.cjs.template $TS_OUTPUT_DIR/proto/tsconfig.json
npm --prefix $TS_OUTPUT_DIR/proto install
npm --prefix $TS_OUTPUT_DIR/proto run gen
cp $TS_STUB_DIR/package.json.cjs.template $TS_OUTPUT_DIR/cjs/package.json

## 5. Setup proper package.json for indexer-proto-ts packages
cp $TS_STUB_DIR/package.json.indexer-proto-ts.template $TS_OUTPUT_DIR/package.json

## 6. ESM import fixes
npm --prefix $ROOT_DIR run tscEsmFix

# 7. Clean up folders
# rm -rf $BUILD_DIR
# rm -rf $PROTO_DIR
# rm -rf $TS_OUTPUT_DIR/proto
find $TS_OUTPUT_DIR -name "*.jse" -type f -delete
find $TS_OUTPUT_DIR -name "*.tse" -type f -delete
find $TS_OUTPUT_DIR -name "*.jsone" -type f -delete
