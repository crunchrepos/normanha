set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createCollection("users")
db.createCollection("favorites")
EOF
