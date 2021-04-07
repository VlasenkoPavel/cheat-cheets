-- select to_jsonb(t) from (select external_id "externalId" from rendered_service_view limit 1) t;
-- {"externalId": 3535966}

-- update
UPDATE
    event_store
SET body = jsonb_set(body, '{"externalId"}', select external_id from rendered_service_view where rendered_service_view.rendered_service_id = event_store.entity_id)
where entity_id = '2b5a71e8-e68a-4b31-950a-d30a7eb5ef4e' AND name = 'RenderedServiceCreated';
-- UPDATE
--     event_store
-- SET body = body || (
--     select
--         to_jsonb(t)
--     from (select external_id "externalId" from rendered_service_view where rendered_service_view.rendered_service_id = event_store.entity_id) t
-- )
-- where entity_id = '2b5a71e8-e68a-4b31-950a-d30a7eb5ef4e' AND name = 'RenderedServiceCreated';
