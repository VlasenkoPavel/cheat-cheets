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
