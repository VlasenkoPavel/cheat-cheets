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
