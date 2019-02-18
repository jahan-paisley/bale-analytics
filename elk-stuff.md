### Create index

`PUT bale
{
    "settings" : {
        "number_of_shards" : 1
    },
    "mappings" : {
        "_doc" : {
            "properties" : {
                "datetime" : { "type" : "date" },
                "jdate" : { "type" : "text" },
                "sender":{"type": "keyword"},
                "content":{"type": "text", "fielddata": true},
                "likes":{"type": "integer"},
                "id":{"type": "text"}
            }
        }
    }
}`

## Queries

`GET /bale/_search
{
  "query": {
    "wildcard": {
      "content": "*"
    }
  },
  "size": 0,
  "aggs": {
    "mydata_agg": {
      "terms": {
        "field": "content",
        "size": 100000
      }
    }
  }
}`

## Ingest command

`curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/_bulk?pretty' --data-binary @/Users/jani/Projects/bale-analytics/export.json`

## Change content fielddata to true

`PUT bale/_mapping/_doc
{
  "properties": {
    "content": { 
      "type":     "text",
      "fielddata": true
    }
  }
}`

## Number of unique senders

`GET bale/_search
{
  "query": {
    "match_all": {}
  },
  "size": 0,
  "aggs": {
      "distinct_senders" : {
            "cardinality" : {
              "field" : "sender"
            }
        }
  }
}`
