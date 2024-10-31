import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: Request) {
    if (!openai.apiKey) {
        console.error("OpenAI API key not configured");
        return NextResponse.json({
            error: {
                message: "OpenAI API key not configured",
            }
        }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { businessName, industry, websiteUrl, description, metricType, customMetricDescription } = body;

        console.log("Received request body:", body);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                role: "system",
                content: "You are a helpful assistant that generates sample Klaviyo event payloads for custom metrics based on business information. The payload should follow Klaviyo's Create Event endpoint format. Always respond with a valid JSON object containing two properties: 'metricName' and 'payload'."
            }, {
                role: "user",
                content: `Generate a sample Klaviyo event payload for a ${industry} business named ${businessName} with website ${websiteUrl}. 
                The business description is: ${description}. 
                The metric type is: ${metricType}${metricType === 'other' ? ` (${customMetricDescription})` : ''}.
                Create realistic sample data that this business might see in their Klaviyo account if they were a customer. 
                Include relevant properties based on the business type and metric. 
                Use the Klaviyo Create Event endpoint format (https://developers.klaviyo.com/en/reference/create_event).
                Provide a descriptive name for the custom metric.
                Return a JSON object with two properties:
                1. 'metricName': A string containing the descriptive name of the custom metric.
                2. 'payload': The Klaviyo event payload object.`
            }],
            temperature: 0.7,
        });

        console.log("OpenAI API response:", completion);

        if (!completion.choices[0].message?.content) {
            throw new Error("No content in OpenAI response");
        }

        const responseContent = completion.choices[0].message.content;
        console.log("OpenAI API response content:", responseContent);

        let generatedPayload;
        try {
            // Try to extract JSON from the response
            const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                generatedPayload = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON object found in the response");
            }
        } catch (parseError) {
            console.error("Error extracting or parsing JSON from OpenAI response:", parseError);
            generatedPayload = { error: "Failed to extract valid JSON from the response" };
        }

        console.log("Generated payload:", generatedPayload);

        return NextResponse.json({ result: generatedPayload });
    } catch (error: any) {
        console.error("Error in POST request:", error);

        if (error.response) {
            console.error("OpenAI API error response:", error.response.status, error.response.data);
            return NextResponse.json({
                error: {
                    message: 'Error from OpenAI API',
                    details: error.response.data
                }
            }, { status: error.response.status });
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            return NextResponse.json({
                error: {
                    message: 'An error occurred during your request.',
                    details: error.message
                }
            }, { status: 500 });
        }
    }
}