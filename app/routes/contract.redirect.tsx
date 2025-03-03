import {ActionFunction, LoaderFunction, redirect, redirectDocument} from "@remix-run/node";
import {ENV} from "../../env.server";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    return redirect(`/?${ url.searchParams.toString() }`, 301);
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);

    const queryParams = new URLSearchParams({
        sid: formData.get("sid")?.toString() ?? "",
        target: formData.get("target")?.toString() ?? ""
    });

    if (!formData.get("contractId") || !formData.get("sid") || !formData.get("target")) {
        return redirect(`/?${ queryParams.toString() }`, );
    }

    queryParams.append("id", formData.get("contractId") as string);
    //TODO: Move url to env/config
    return redirectDocument(`${ENV.BASE_URL}?${ queryParams.toString() }`, 302);
};
