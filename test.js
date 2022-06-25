import axios from "axios";
import https from "node:https";

async function login(email, password) {
    try {
        const response = await axios.post(
            "https://aurion.junia.com/login",
            "username=aaa+&password=aaa&j_idt28=",
            {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                validateStatus: (status) => status == 302,
            }
        );
        // console.log(response.headers);
        console.log(response.status);
        // console.log(response.data);
        console.log(response.headers);
        return response.headers["set-cookie"][0].split(";")[0].split("=")[1];
    } catch (error) {
        console.log(error);
    }
}

// login("aa", "bb");

/*
const payload =
    "username=aaa+&password=aaa&j_idt28=";
const options = {
    hostname: "aurion.junia.com",
    path: "/login",
    method: "POST",
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Connection: "keep-alive",
    },
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`headers: ${JSON.stringify(res.headers)}`);
    let body = "";

    res.on("data", (d) => {
        body += d;
    });

    res.on("end", () => {
        console.log(body);
    });
});

req.on("error", (error) => {
    console.error(error);
});

req.write(payload);
req.end();
*/

/*
async function postNote(viewState, sessionId) {
    // use this payload : javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt181&javax.faces.partial.execute=form%3Aj_idt181&javax.faces.partial.render=form%3Aj_idt181&form%3Aj_idt181=form%3Aj_idt181&form%3Aj_idt181_pagination=true&form%3Aj_idt181_first=20&form%3Aj_idt181_rows=20&form%3Aj_idt181_skipChildren=true&form%3Aj_idt181_encodeFeature=true&form=form&form%3AlargeurDivCenter=615&form%3AmessagesRubriqueInaccessible=&form%3Asearch-texte=&form%3Asearch-texte-avancer=&form%3Ainput-expression-exacte=&form%3Ainput-un-des-mots=&form%3Ainput-aucun-des-mots=&form%3Ainput-nombre-debut=&form%3Ainput-nombre-fin=&form%3AcalendarDebut_input=&form%3AcalendarFin_input=&form%3Aj_idt181_reflowDD=0_0&form%3Aj_idt181%3Aj_idt186%3Afilter=&form%3Aj_idt181%3Aj_idt188%3Afilter=&form%3Aj_idt181%3Aj_idt190%3Afilter=&form%3Aj_idt181%3Aj_idt192%3Afilter=&form%3Aj_idt181%3Aj_idt194%3Afilter=&form%3Aj_idt181%3Aj_idt196%3Afilter=&form%3Aj_idt254_focus=&form%3Aj_idt254_input=44323&javax.faces.ViewState=2945200591299715580%3A-7640645016682288342
    const res = await axios.post(
        "https://aurion.junia.com/faces/ChoixIndividu.xhtml",
        {
            "javax.faces.partial.ajax": "true",
            "javax.faces.partial.source": "form:j_idt181",
            "javax.faces.partial.execute": "form:j_idt181",
            "javax.faces.partial.render": "form:j_idt181",
            "form:j_idt181": "form:j_idt181",
            "form:j_idt181_pagination": "true",
            "form:j_idt181_first": "20",
            "form:j_idt181_rows": "20",
            "form:j_idt181_skipChildren": "true",
            "form:j_idt181_encodeFeature": "true",
            form: "form",
            "form:largeurDivCenter": "615",
            "form:messagesRubriqueInaccessible": "",
            "form:search-texte": "",
            "form:search-texte-avancer": "",
            "form:input-expression-exacte": "",
            "form:input-un-des-mots": "",
            "form:input-aucun-des-mots": "",
            "form:input-nombre-debut": "",
            "form:input-nombre-fin": "",
            "form:calendarDebut_input": "",
            "form:calendarFin_input": "",
            "form:j_idt181_reflowDD": "0_0",
            "form:j_idt181:j_idt186:filter": "",
            "form:j_idt181:j_idt188:filter": "",
            "form:j_idt181:j_idt190:filter": "",
            "form:j_idt181:j_idt192:filter": "",
            "form:j_idt181:j_idt194:filter": "",
            "form:j_idt181:j_idt196:filter": "",
            "form:j_idt254_focus": "",
            "form:j_idt254_input": "44323",
            "javax.faces.ViewState": viewState,
        },
        {
            headers: {
                Cookie: `JSESSIONID=${sessionId}`,
            },
        }
    );

    console.log(res.data);
    console.log(`PostNote status: ${res.status}`);
    console.log(res.headers["content-type"]);
    // return parseNote(res.data);
}
*/

// postNote but with https

async function postNote(viewState, sessionId) {
    const payload = `javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt181&javax.faces.partial.execute=form%3Aj_idt181&javax.faces.partial.render=form%3Aj_idt181&form%3Aj_idt181=form%3Aj_idt181&form%3Aj_idt181_pagination=true&form%3Aj_idt181_first=20&form%3Aj_idt181_rows=20&form%3Aj_idt181_skipChildren=true&form%3Aj_idt181_encodeFeature=true&form=form&form%3AlargeurDivCenter=615&form%3AmessagesRubriqueInaccessible=&form%3Asearch-texte=&form%3Asearch-texte-avancer=&form%3Ainput-expression-exacte=&form%3Ainput-un-des-mots=&form%3Ainput-aucun-des-mots=&form%3Ainput-nombre-debut=&form%3Ainput-nombre-fin=&form%3AcalendarDebut_input=&form%3AcalendarFin_input=&form%3Aj_idt181_reflowDD=0_0&form%3Aj_idt181%3Aj_idt186%3Afilter=&form%3Aj_idt181%3Aj_idt188%3Afilter=&form%3Aj_idt181%3Aj_idt190%3Afilter=&form%3Aj_idt181%3Aj_idt192%3Afilter=&form%3Aj_idt181%3Aj_idt194%3Afilter=&form%3Aj_idt181%3Aj_idt196%3Afilter=&form%3Aj_idt254_focus=&form%3Aj_idt254_input=44323&javax.faces.Viewstate=${viewState}`;

    const options = {
        hostname: "aurion.junia.com",
        path: "/faces/ChoixIndividu.xhtml",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: `JSESSIONID=${sessionId}`,
        },
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(`headers: ${JSON.stringify(res.headers)}`);

        res.on("data", (d) => {
            process.stdout.write(d);
        });
    });
    req.on("error", (error) => {
        console.error(error);
    });
    req.write(payload);
    req.end();
}

await postNote(
    "-5694475672039183163:3933060400826336934",
    "229E84965A4EBB3B46E2F7DA80C28F29"
);
