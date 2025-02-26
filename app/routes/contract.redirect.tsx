import {ActionFunction} from "@remix-run/node";

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    console.log(formData);
    const id = formData.get("id");
    const target = formData.get("target");
    const sid = formData.get("sid");

    if (!id || typeof  id !== "string") {
        return new Response(JSON.stringify({ error: "Missing contract ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        })
    }

    const baseUrl: URL = new URL("https://idp.felleskomponent.no/nidp/saml2/spsend");

    if (id) baseUrl.searchParams.append("id", id.toString());
    if (target) baseUrl.searchParams.append("target", target.toString());
    if (sid) baseUrl.searchParams.append("sid", sid.toString());

    console.log("Redirecting to:", baseUrl.toString());



    // Test med return/redirect evt 302.
    // Trenger ikke sende med body.
    return new Response(JSON.stringify({ url: baseUrl.toString() }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
