SHOW TRANSACTION ISOLATION LEVEL;


-- ******************** UPDATE COLUMN IF EXISTS ******************************
DO $$
BEGIN
    IF EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name=organization and column_name=network_id)
    THEN
        ALTER TABLE organization RENAME COLUMN "your_column" TO "your_new_column";
    END IF;
END $$;

-- *** https://www.postgresqltutorial.com/postgresql-update/ ***
-- *** The following statement updates values that come from the link table for the columns in the link_tmp table: ***

UPDATE link_tmp
    SET rel = link.rel,
    description = link.description,
    last_update = link.last_update
    FROM
        link
    WHERE
        link_tmp.id = link.id;

-- update using raw params
UPDATE referral
    SET rendered_service_id = (
        SELECT rendered_service_id
        FROM bi_rendered_service
        WHERE bi_rendered_service.referral_id = referral.referral_id
        limit 1
    );

-- array loop iterating iteration
CREATE OR REPLACE FUNCTION update_bi_rendered_service(ids UUID[]) RETURNS VOID AS
$$

BEGIN
    FOR i in array_lower(ids, 1)..array_upper(ids, 1) LOOP
        RAISE NOTICE 'uuid: %', ids[i];
    END LOOP;
    -- FOR id IN (SELECT unnest(ids))
    -- LOOP
    -- END LOOP;
END
$$ LANGUAGE plpgsql;
