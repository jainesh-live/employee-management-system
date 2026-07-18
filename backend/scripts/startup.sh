#!/bin/bash

APP_HOME=""
JAR_NAME="employee-mgmt-0.0.1-SNAPSHOT.jar"
JAR_PATH="${APP_HOME}/${JAR_NAME}"
LOG_FILE="${APP_HOME}/application.log"

echo "========================================="
echo "Starting Employee Service"
echo "Time      : $(date)"
echo "JAR       : ${JAR_PATH}"
echo "Log File  : ${LOG_FILE}"
echo "========================================="

# Environment variables
export SPRING_PROFILES_ACTIVE=local
export DB_USERNAME=
export DB_PASSWORD=
export DB_URL=

echo "Environment variables configured."

# Validate JAR exists
if [ ! -f "$JAR_PATH" ]; then
    echo "ERROR: JAR not found: ${JAR_PATH}"
    exit 1
fi

# Create log directory if it doesn't exist
mkdir -p "$APP_HOME"

echo "Starting application in background..."

nohup java -jar "$JAR_PATH" > "$LOG_FILE" 2>&1 &

PID=$!

echo "Application started successfully."
echo "PID      : $PID"
echo "Log File : $LOG_FILE"
echo "Time     : $(date)"

# Give the application a few seconds to start
sleep 5

# Check if the process is still running
if ps -p "$PID" > /dev/null; then
    echo "Status   : RUNNING"
else
    echo "Status   : FAILED TO START"
    echo "Last 50 log lines:"
    tail -50 "$LOG_FILE"
    exit 1
fi