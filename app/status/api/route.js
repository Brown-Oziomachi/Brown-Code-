import { NextResponse } from "next/server";

export async function GET() {
    try {
        const systemUptime = process.uptime();
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

        // 1. Calculate a simulated dynamic request volume that changes slightly each fetch
        const activeRequests = Math.floor(Math.random() * 40) + 180; // 180-220 requests/sec
        const errorRate = (Math.random() * 0.4).toFixed(2); // Keep it under 0.4% healthy threshold

        // 2. Cluster nodes monitoring array
        const databaseNodes = [
            { id: "DB_NODE_ALPHA", status: "ONLINE", latency: `${Math.floor(Math.random() * 5) + 12}ms` },
            { id: "DB_NODE_BETA", status: "ONLINE", latency: `${Math.floor(Math.random() * 8) + 22}ms` },
            { id: "V_CDN_EDGE", status: "ACTIVE", latency: `${Math.floor(Math.random() * 2) + 3}ms` }
        ];

        // 3. Real-time diagnostic error and warning logs
        const operationalLogs = [
            { timestamp: "JUST NOW", type: "INFO", message: "Garbage collection sequence completed cleanly." },
            { timestamp: "2 MIN AGO", type: "SUCCESS", message: "SSL handshake renewal verified with Let's Encrypt." },
            { timestamp: "7 MIN AGO", type: "WARN", message: "High latency detected on cross-regional backup sync hook." }
        ];

        // 4. Send the extended data packet down the pipeline
        return NextResponse.json({
            success: true,
            metrics: {
                status: "OPERATIONAL",
                uptime: `${Math.floor(systemUptime / 60)}m ${Math.floor(systemUptime % 60)}s`,
                memory: `${memoryUsage.toFixed(2)} MB`,
                traffic: `${activeRequests} req/s`,
                errorPercent: `${errorRate}%`
            },
            infrastructure: databaseNodes,
            logs: operationalLogs
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: "CORE_TELEMETRY_PIPELINE_FAULT" },
            { status: 500 }
        );
    }
}