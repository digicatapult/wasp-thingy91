#!/usr/bin/env bash
AUTH_TOKEN_FILE=~/.wasp-stage_com-api-token
AUTH_TOKEN="$(cat $AUTH_TOKEN_FILE)"
SERVER_API_URL=https://www.wasp-stage.com/api
THINGY91_CSV_FILE=thingy91-devices.csv

print_usage() {
  echo "Provisions Thingy91 Sensors onto a WASP platform"
  echo ""
  echo "Usage:"
  echo "  ./thingy91-provision.sh [ -h ] [ -f <input.csv> ] [ -a <file-with-auth-token> ] [ -u <server-api-url> ]"
  echo ""
  echo "Options:"
  echo "  -a        Specify an alternative file with a wasp bearer token"
  echo "            (default ~/.wasp-stage_com-api-token)"
  echo "  -f        Specify an input csv file, must be formatted as"
  echo "            serial,imei"
  echo "            with unix line returns and no headers"
  echo "            (default thingy91-devices.csv)"
  echo "  -u        Specify the wasp instances base API url"
  echo "            (default https://www.wasp-stage.com/api)"
  echo ""
  echo ""
  echo "Flags: "
  echo "  -h        Prints this message"
}

while getopts ":a:f:u:h" opt; do
    case ${opt} in
        h )
          print_usage
          exit 0
          ;;
        a )
          AUTH_TOKEN_FILE=${OPTARG}
          AUTH_TOKEN="$(cat $AUTH_TOKEN_FILE)"
          ;;
        f )
          THINGY91_CSV_FILE=${OPTARG}
          ;;
        u )
          SERVER_API_URL=${OPTARG}
          ;;
       \? )
          echo "Invalid Option: -$OPTARG" 1>&2
          echo "\n"
          print_usage
          exit 1
          ;;
    esac
done

if [ ! -s $THING91_CSV_FILE ] ; then
    echo -e "File $THINGY91_CSV_FILE is not present or greater than 0 bytes"
    exit 1
    elif [[ $(file -b - < $THINGY91_CSV_FILE ) =~ CRLF ]] ; then
        echo -e "File $THINGY91_CSV_FILE has CRLF line endings, please convert to LF"
        exit 1
fi

if [ ! -s $AUTH_TOKEN_FILE ] ; then
    echo -e "File $AUTH_TOKEN_FILE is not present or greater than 0 bytes"
    exit 1
fi

while IFS=, read imei serial
do
    curl -sS -X 'POST' \
    $SERVER_API_URL/v1/thing \
    -H 'accept: application/json' \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -H 'Content-Type: application/json' \
    -d "{
        \"type\": \"thingy91\",
        \"metadata\": {
            \"imei\": \"$imei\",
            \"serial_number\": \"$serial\",
            \"nrf-id\": \"nrf-$imei\"
            }
        }" \
    | jq -r 'env.SERVER_API_URL+"/v1/thing/\(.id)/ingest/"'\
    | xargs -I{-} curl -sS -X 'POST' {-} \
    -H 'accept: application/json' \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -H 'Content-Type: application/json' \
    -d "{
        \"ingestId\": \"nrf-$imei\",
        \"ingest\": \"nordic-cloud\",
        \"configuration\": {}
        }"
done < $THINGY91_CSV_FILE