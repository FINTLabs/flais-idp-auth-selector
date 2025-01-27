import {json, redirect} from "@remix-run/node";
import {ActionFunction} from "@remix-run/node";
import {URLSearchParams} from "url";

export let action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const target = formData.get("target");
    const sid = formData.get("sid");

    const baseUrl = "https://idp.felleskomponent.no/nidp/saml2/spsend";
    const urlParams = new URLSearchParams();

    if (id) urlParams.append("id", id.toString());
    if (target) urlParams.append("target", encodeURIComponent(target.toString()));
    if (sid) urlParams.append("sid", sid.toString());

    const redirectUrl = `${baseUrl}?${urlParams.toString()}`;
    if (!id || !target) {
        return json({error: "Missing required parameters"}, {status: 400});
    }
    return json({url: redirectUrl}, {status: 200});
};
