##queries
GET /bale/_search
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
}

##ingest command
`➜  ~ curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/_bulk?pretty' --data-binary @/Users/jani/Projects/bale-analytics/export.json`

##change content fielddata to true

PUT bale/_mapping/_doc
{
  "properties": {
    "content": { 
      "type":     "text",
      "fielddata": true
    }
  }
}