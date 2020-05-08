RAISE NOTICE 'NEW: %', NEW;
-- CREATE OR REPLACE FUNCTION clear_tables(excluded text[] = '{migrations}'::text[]) returns void AS
CREATE OR REPLACE FUNCTION clear_tables(excluded text[] = array['migrations']) returns void AS
$$
    DECLARE
        table_name RECORD;
    begin
        for table_name IN
            SELECT tablename
            FROM pg_catalog.pg_tables
            WHERE schemaname='public'
            AND tablename != ANY(excluded)
        ORDER BY tablename loop
            EXECUTE format('DELETE FROM %I', btrim(table_name::TEXT, '()'));
        end LOOP;
    END
$$ LANGUAGE plpgsql;


-- //////////////////////

CREATE OR REPLACE FUNCTION set_version() RETURNS TRIGGER AS
$$
DECLARE
    lastversion int;
    ver int;
    ver_column text := quote_ident(TG_ARGV[1]);
    _new hstore;
    _ver hstore;
BEGIN
    EXECUTE format('select max(%I) from %I where %I = $1.%I', TG_ARGV[1], TG_TABLE_NAME, TG_ARGV[0], TG_ARGV[0]) INTO lastversion USING NEW;
    ver := COALESCE(lastversion +1, 1);
    _new := hstore(NEW) || hstore(ver_column, ver::text);
    NEW := NEW #= _new;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

-- **************************************************
DO $$
BEGIN
    IF EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name=organization and column_name=network_id)
    THEN
        ALTER TABLE organization RENAME COLUMN "your_column" TO "your_new_column";
    END IF;
END $$;
