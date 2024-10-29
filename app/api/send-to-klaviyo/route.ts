import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { apiKey, email, payload } = await req.json();

    if (!apiKey) {
        return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Format the payload properties
    const formattedProperties = {
        ...payload.properties,
        email: email,  // Add email to properties
        $value: 1  // Add $value as a top-level property
    };

    const formattedPayload = {
        token: apiKey,
        event: payload.metricName,
        customer_properties: {
            $email: email
        },
        properties: formattedProperties,
        time: new Date().toISOString()
    };

    console.log('Formatted Payload:', JSON.stringify(formattedPayload, null, 2));

    try {
        const response = await fetch('https://a.klaviyo.com/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedPayload)
        });

        const responseText = await response.text();
        let responseData;

        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            responseData = { parseError: 'Unable to parse JSON response', rawResponse: responseText };
        }

        if (!response.ok) {
            const errorMessage = responseData.detail || 'Unknown error occurred';
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
        }

        return NextResponse.json({ success: true, data: responseData });
    } catch (error: unknown) {
        console.error('Error sending to Klaviyo:', error);
        return NextResponse.json({
            error: "Failed to send to Klaviyo",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}