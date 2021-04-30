select to_jsonb(t) from (select external_id "externalId" from rendered_service_view limit 1) t;
-- {"externalId": 3535966}

-- update
UPDATE
    event_store
SET body = jsonb_set(body, '{"externalId"}'::text[], (SELECT external_id FROM rendered_service_view
    WHERE rendered_service_view.rendered_service_id = event_store.entity_id)::text::jsonb)
WHERE name = 'RenderedServiceCreated' and body->>'externalId' IS NULL;

UPDATE
    event_store
SET body = body || (
    SELECT
        to_jsonb(t)
    FROM (SELECT external_id "externalId" FROM rendered_service_view WHERE rendered_service_view.rendered_service_id = event_store.entity_id) t
)
WHERE entity_id = '2b5a71e8-e68a-4b31-950a-d30a7eb5ef4e' AND "name" = 'RenderedServiceCreated';
