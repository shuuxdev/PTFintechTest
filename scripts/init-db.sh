#!/bin/bash

# Restore PostgreSQL database from backup.sql
psql -U postgres -d task_management_system -f /docker-entrypoint-initdb.d/backup.sql
