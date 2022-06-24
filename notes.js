import axios from "axios";
import https from "node:https";
import url from "node:url";

// async function login(email, password) {
//     try {
//         const response = await axios.post(
//             "https://aurion.junia.com/login",
//             "username=nathan.eudeline%40student.junia.com+&password=tu8%23BeW7&j_idt28=",
//             {
//                 headers: {
//                     "Content-type": "application/x-www-form-urlencoded",
//                     Connection: "keep-alive",
//                 },
//             }
//         );
//         // console.log(response.headers);
//         console.log(response.status);
//         console.log(response.data);
//         return response.headers["set-cookie"][0].split(";")[0].split("=")[1];
//     } catch (error) {
//         console.log(error);
//     }
// }

function login(email, password) {
    const payload = new url.URLSearchParams(
        `username=${email}&password=${password}&j_idt28=`
    ).toString();
    // console.log(payload);

    const options = {
        hostname: "aurion.junia.com",
        path: "/login",
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Connection: "keep-alive",
        },
    };

    return new Promise((resolve) => {
        const req = https.request(options, (res) => {
            // console.log(`statusCode: ${res.statusCode}`);
            // console.log(`headers: ${JSON.stringify(res.headers)}`);

            resolve(res.headers["set-cookie"][0].split(";")[0].split("=")[1]);
        });

        req.on("error", (error) => {
            console.error(error);
        });

        req.write(payload);
        req.end();
    });
}

function parseViewState(body) {
    // from <input type="hidden" name="javax.faces.ViewState" id="j_id1:javax.faces.ViewState:0" value="6319028752716817461:-3967221286258128993" autocomplete="off" />
    const viewState = body.match(
        /<input type="hidden" name="javax.faces.ViewState" id="j_id1:javax.faces.ViewState:0" value="([^"]+)" autocomplete="off" \/>/
    )[1];
    return viewState;
}

function parseNote(body) {
    // from <?xml version='1.0' encoding='UTF-8'?>
    //<partial-response id="j_id1"><changes><update id="form:j_idt95"><![CDATA[<div id="form:j_idt95" class="ui-messages ui-widget" aria-live="polite"></div>]]></update><update id="form:messages"><![CDATA[<div id="form:messages" class="ui-messages ui-widget" aria-live="polite"></div>]]></update><update id="form:j_idt181"><![CDATA[<tr data-ri="20" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">29/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_ELEC_TP8_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP 8</span></td><td role="gridcell" class=""><span class="preformatted ">  5.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="21" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">25/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MATH4_Q1</span></td><td role="gridcell" class=""><span class="preformatted ">Contrôle Continu de Mathématiques n°1</span></td><td role="gridcell" class=""><span class="preformatted "> 11.10</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="22" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">25/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_PROG2_CC2</span></td><td role="gridcell" class=""><span class="preformatted ">Interrogation n°2</span></td><td role="gridcell" class=""><span class="preformatted "> 17.75</span></td><td role="gridcell" class=""><span class="preformatted ">50</span></td><td role="gridcell" class=""></td></tr><tr data-ri="23" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">18/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_WEB_DS</span></td><td role="gridcell" class=""><span class="preformatted ">DS de Technologies web</span></td><td role="gridcell" class=""><span class="preformatted "> 16.70</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="24" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">15/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_ELEC_TP7_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP 7</span></td><td role="gridcell" class=""><span class="preformatted "> 14.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="25" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">15/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_ARDUINO1</span></td><td role="gridcell" class=""><span class="preformatted ">Note de TP sur carte Arduino</span></td><td role="gridcell" class=""><span class="preformatted "> 19.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="26" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">15/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_ARDUINO2</span></td><td role="gridcell" class=""><span class="preformatted ">Note de TP en simulation</span></td><td role="gridcell" class=""><span class="preformatted "> 16.24</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="27" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">15/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_ARDUINO_PROJET</span></td><td role="gridcell" class=""><span class="preformatted ">Mini-Projet</span></td><td role="gridcell" class=""><span class="preformatted "> 11.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="28" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">11/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MATH3_P1</span></td><td role="gridcell" class=""><span class="preformatted ">Epreuve de Partiel</span></td><td role="gridcell" class=""><span class="preformatted ">  7.00</span></td><td role="gridcell" class=""><span class="preformatted ">100</span></td><td role="gridcell" class=""></td></tr><tr data-ri="29" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">04/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_PROG2_DS</span></td><td role="gridcell" class=""><span class="preformatted ">Devoir surveillé</span></td><td role="gridcell" class=""><span class="preformatted "> 11.00</span></td><td role="gridcell" class=""><span class="preformatted ">100</span></td><td role="gridcell" class=""></td></tr><tr data-ri="30" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">01/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_ELEC_TP6_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP 6</span></td><td role="gridcell" class=""><span class="preformatted "> 14.50</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="31" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">25/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MATH3_Q2</span></td><td role="gridcell" class=""><span class="preformatted ">Contrôle Continu de Mathématiques n°2</span></td><td role="gridcell" class=""><span class="preformatted "> 11.20</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="32" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">25/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MECA_INT2</span></td><td role="gridcell" class=""><span class="preformatted ">Interrogation n°2</span></td><td role="gridcell" class=""><span class="preformatted ">  9.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="33" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">22/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_MATHS_TP3_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP3</span></td><td role="gridcell" class=""><span class="preformatted "> 18.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="34" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">04/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_INFO_WEB_CC</span></td><td role="gridcell" class=""><span class="preformatted ">Contrôle continu de Technologies web</span></td><td role="gridcell" class=""><span class="preformatted "> 16.00</span></td><td role="gridcell" class=""><span class="preformatted ">100</span></td><td role="gridcell" class=""></td></tr><tr data-ri="35" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">04/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_PROG2_CC1</span></td><td role="gridcell" class=""><span class="preformatted ">Interrogation n°1</span></td><td role="gridcell" class=""><span class="preformatted "> 16.50</span></td><td role="gridcell" class=""><span class="preformatted ">50</span></td><td role="gridcell" class=""></td></tr><tr data-ri="36" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">01/02/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_ELEC_TP5_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP 5</span></td><td role="gridcell" class=""><span class="preformatted "> 13.50</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="37" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">29/01/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S1_MATH2_P2</span></td><td role="gridcell" class=""><span class="preformatted ">Seconde session de Mathématiques</span></td><td role="gridcell" class=""><span class="preformatted "> 16.25</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="38" class="ui-widget-content ui-datatable-even CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">28/01/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MATH3_Q1</span></td><td role="gridcell" class=""><span class="preformatted ">Contrôle Continu de Mathématiques n°1</span></td><td role="gridcell" class=""><span class="preformatted "> 15.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr><tr data-ri="39" class="ui-widget-content ui-datatable-odd CursorInitial" role="row"><td role="gridcell" class="TexAlLeft"><span class="preformatted ">28/01/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_CNB1_S2_MECA_INT1</span></td><td role="gridcell" class=""><span class="preformatted ">Interrogation n°1</span></td><td role="gridcell" class=""><span class="preformatted "> 13.25</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td><td role="gridcell" class=""></td></tr>]]></update><update id="j_id1:javax.faces.ViewState:0"><![CDATA[2945200591299715580:-7640645016682288342]]></update></changes></partial-response>
    // note structure {date: ..., code: ..., epreuve: ..., note: ..., coefficient: ...}
    // one note <span class="preformatted ">29/03/2022</span></td><td role="gridcell" class=""><span class="preformatted ">2122_ISEN_CIR1_S2_ELEC_TP8_3</span></td><td role="gridcell" class=""><span class="preformatted ">Evaluation du TP 8</span></td><td role="gridcell" class=""><span class="preformatted ">  5.00</span></td><td role="gridcell" class=""><span class="preformatted ">1</span></td>
    const noteRows = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
    const notes = noteRows.map((row) => {
        const note = {};
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
        // console.log(cells);
        note.date = cells[0].match(
            /<span class="preformatted ">([^<]+)<\/span>/
        )[1];
        note.code = cells[1].match(
            /<span class="preformatted ">([^<]+)<\/span>/
        )[1];
        note.epreuve = cells[2].match(
            /<span class="preformatted ">([^<]+)<\/span>/
        )[1];
        note.note = cells[3].match(
            /<span class="preformatted ">([^<]+)<\/span>/
        )[1];
        note.coefficient = cells[4].match(
            /<span class="preformatted ">([^<]+)<\/span>/
        )[1];
        return note;
    });
    return notes;
}

async function getViewState(url, sessionId) {
    const res = await axios.get(url, {
        headers: {
            Cookie: `JSESSIONID=${sessionId}`,
        },
    });
    return parseViewState(res.data);
}

// function postMainSidebar(viewState, sessionId) {
//     const payload = new url.URLSearchParams({
//         "javax.faces.partial.ajax": "true",
//         "javax.faces.partial.source": "form:j_idt52",
//         "javax.faces.partial.execute": "form:j_idt52",
//         "javax.faces.partial.render": "form:sidebar",
//         "form:j_idt52": "form:j_idt52",
//         "webscolaapp.Sidebar.ID_SUBMENU": "submenu_44413",
//         form: "form",
//         "form:largeurDivCenter": "615",
//         "form:sauvegarde": "",
//         "form:j_idt772_focus": "",
//         "form:j_idt772_input": "44323",
//         "javax.faces.ViewState": viewState,
//     }).toString();
//     console.log(payload);

//     const options = {
//         hostname: "aurion.junia.com",
//         path: "/faces/MainMenuPage.xhtml",
//         method: "POST",
//         headers: {
//             Cookie: `JSESSIONID=${sessionId}`,
//             "Content-type": "application/x-www-form-urlencoded",
//             Connection: "keep-alive",
//         },
//     };

//     const req = https.request(options, (res) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         console.log(`headers: ${JSON.stringify(res.headers)}`);
//         let body = "";

//         res.on("data", (d) => {
//             body += d;
//         });

//         res.on("end", () => {
//             console.log(body);
//         });
//     });

//     req.on("error", (error) => {
//         console.error(error);
//     });

//     req.write(payload);
//     req.end();
// }

async function postMainSidebar(viewState, sessionId) {
    // use this payload : 'javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt52&javax.faces.partial.execute=form%3Aj_idt52&javax.faces.partial.render=form%3Asidebar&form%3Aj_idt52=form%3Aj_idt52&webscolaapp.Sidebar.ID_SUBMENU=submenu_44413&form=form&form%3AlargeurDivCenter=615&form%3Asauvegarde=&form%3Aj_idt772_focus=&form%3Aj_idt772_input=44323&javax.faces.ViewState=-5056887933331458699%3A-891539684155069079'
    const res = await axios.post(
        "https://aurion.junia.com/faces/MainMenuPage.xhtml",
        new url.URLSearchParams({
            "javax.faces.partial.ajax": "true",
            "javax.faces.partial.source": "form:j_idt52",
            "javax.faces.partial.execute": "form:j_idt52",
            "javax.faces.partial.render": "form:sidebar",
            "form:j_idt52": "form:j_idt52",
            "webscolaapp.Sidebar.ID_SUBMENU": "submenu_44413",
            form: "form",
            "form:largeurDivCenter": "615",
            "form:sauvegarde": "",
            "form:j_idt772_focus": "",
            "form:j_idt772_input": "44323",
            "javax.faces.ViewState": viewState,
        }).toString(),
        {
            headers: {
                Cookie: `JSESSIONID=${sessionId}`,
                "Content-type": "application/x-www-form-urlencoded",
            },
        }
    );
}

async function postMainSidebarNote(viewState, sessionId) {
    // use this payload : 'form=form&form%3AlargeurDivCenter=615&form%3Asauvegarde=&form%3Aj_idt772_focus=&form%3Aj_idt772_input=44323&javax.faces.ViewState=-5056887933331458699%3A-891539684155069079&form%3Asidebar=form%3Asidebar&form%3Asidebar_menuid=3_1'
    const menuId = "3_1";
    const res = await axios.post(
        "https://aurion.junia.com/faces/MainMenuPage.xhtml",
        new url.URLSearchParams({
            form: "form",
            "form:largeurDivCenter": "615",
            "form:sauvegarde": "",
            "form:j_idt772_focus": "",
            "form:j_idt772_input": "44323",
            "javax.faces.ViewState": viewState,
            "form:sidebar": "form:sidebar",
            "form:sidebar_menuid": menuId,
        }).toString(),
        {
            headers: {
                Cookie: `JSESSIONID=${sessionId}`,
            },
            maxRedirects: 1,
        }
    );
    return parseViewState(res.data);
}

async function getNoteViewState(sessionId) {
    const res = await axios.get(
        "https://aurion.junia.com/faces/ChoixIndividu.xhtml",
        {
            headers: {
                Cookie: `JSESSIONID=${sessionId}`,
            },
        }
    );
    return parseViewState(res.data);
}

// async function postNote(viewState, sessionId) {
//     // use this payload : javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt181&javax.faces.partial.execute=form%3Aj_idt181&javax.faces.partial.render=form%3Aj_idt181&form%3Aj_idt181=form%3Aj_idt181&form%3Aj_idt181_pagination=true&form%3Aj_idt181_first=20&form%3Aj_idt181_rows=20&form%3Aj_idt181_skipChildren=true&form%3Aj_idt181_encodeFeature=true&form=form&form%3AlargeurDivCenter=615&form%3AmessagesRubriqueInaccessible=&form%3Asearch-texte=&form%3Asearch-texte-avancer=&form%3Ainput-expression-exacte=&form%3Ainput-un-des-mots=&form%3Ainput-aucun-des-mots=&form%3Ainput-nombre-debut=&form%3Ainput-nombre-fin=&form%3AcalendarDebut_input=&form%3AcalendarFin_input=&form%3Aj_idt181_reflowDD=0_0&form%3Aj_idt181%3Aj_idt186%3Afilter=&form%3Aj_idt181%3Aj_idt188%3Afilter=&form%3Aj_idt181%3Aj_idt190%3Afilter=&form%3Aj_idt181%3Aj_idt192%3Afilter=&form%3Aj_idt181%3Aj_idt194%3Afilter=&form%3Aj_idt181%3Aj_idt196%3Afilter=&form%3Aj_idt254_focus=&form%3Aj_idt254_input=44323&javax.faces.ViewState=2945200591299715580%3A-7640645016682288342
//     const res = await axios.post(
//         "https://aurion.junia.com/faces/ChoixIndividu.xhtml",
//         {
//             "javax.faces.partial.ajax": "true",
//             "javax.faces.partial.source": "form:j_idt181",
//             "javax.faces.partial.execute": "form:j_idt181",
//             "javax.faces.partial.render": "form:j_idt181",
//             "form:j_idt181": "form:j_idt181",
//             "form:j_idt181_pagination": "true",
//             "form:j_idt181_first": "20",
//             "form:j_idt181_rows": "20",
//             "form:j_idt181_skipChildren": "true",
//             "form:j_idt181_encodeFeature": "true",
//             form: "form",
//             "form:largeurDivCenter": "615",
//             "form:messagesRubriqueInaccessible": "",
//             "form:search-texte": "",
//             "form:search-texte-avancer": "",
//             "form:input-expression-exacte": "",
//             "form:input-un-des-mots": "",
//             "form:input-aucun-des-mots": "",
//             "form:input-nombre-debut": "",
//             "form:input-nombre-fin": "",
//             "form:calendarDebut_input": "",
//             "form:calendarFin_input": "",
//             "form:j_idt181_reflowDD": "0_0",
//             "form:j_idt181:j_idt186:filter": "",
//             "form:j_idt181:j_idt188:filter": "",
//             "form:j_idt181:j_idt190:filter": "",
//             "form:j_idt181:j_idt192:filter": "",
//             "form:j_idt181:j_idt194:filter": "",
//             "form:j_idt181:j_idt196:filter": "",
//             "form:j_idt254_focus": "",
//             "form:j_idt254_input": "44323",
//             "javax.faces.ViewState": viewState,
//         },
//         {
//             headers: {
//                 Cookie: `JSESSIONID=${sessionId}`,
//             },
//         }
//     );

//     console.log(res.data);
//     console.log(`PostNote status: ${res.status}`);
//     console.log(res.headers["content-type"]);
//     // return parseNote(res.data);
// }

async function postNote(viewState, sessionId) {
    const payload = `javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt181&javax.faces.partial.execute=form%3Aj_idt181&javax.faces.partial.render=form%3Aj_idt181&form%3Aj_idt181=form%3Aj_idt181&form%3Aj_idt181_pagination=true&form%3Aj_idt181_first=0&form%3Aj_idt181_rows=1000&form%3Aj_idt181_skipChildren=true&form%3Aj_idt181_encodeFeature=true&form=form&form%3AlargeurDivCenter=615&form%3AmessagesRubriqueInaccessible=&form%3Asearch-texte=&form%3Asearch-texte-avancer=&form%3Ainput-expression-exacte=&form%3Ainput-un-des-mots=&form%3Ainput-aucun-des-mots=&form%3Ainput-nombre-debut=&form%3Ainput-nombre-fin=&form%3AcalendarDebut_input=&form%3AcalendarFin_input=&form%3Aj_idt181_reflowDD=0_0&form%3Aj_idt181%3Aj_idt186%3Afilter=&form%3Aj_idt181%3Aj_idt188%3Afilter=&form%3Aj_idt181%3Aj_idt190%3Afilter=&form%3Aj_idt181%3Aj_idt192%3Afilter=&form%3Aj_idt181%3Aj_idt194%3Afilter=&form%3Aj_idt181%3Aj_idt196%3Afilter=&form%3Aj_idt254_focus=&form%3Aj_idt254_input=44323&javax.faces.Viewstate=${viewState}`;

    const options = {
        hostname: "aurion.junia.com",
        path: "/faces/ChoixIndividu.xhtml",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: `JSESSIONID=${sessionId}`,
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";

            res.on("data", (d) => {
                data += d;
            });

            res.on("end", () => {
                resolve(data);
            });
        });
        req.on("error", (error) => {
            console.error(error);
        });
        req.write(payload);
        req.end();
    });
}

export async function getAllNote(email, password) {
    const sessionId = await login(email, password);
    // console.log(sessionId);

    let viewState = await getViewState("https://aurion.junia.com/", sessionId);
    // console.log(`main viewState: ${viewState}`);

    await postMainSidebar(viewState, sessionId);

    viewState = await postMainSidebarNote(viewState, sessionId);
    // console.log(`note viewState: ${viewState}`);

    const notes = await postNote(viewState, sessionId);
    try {
        return parseNote(notes);
    } catch (error) {
        return new Error(error);
    }
}

// console.log(await getAllNote("nathan.eudeline@student.junia.com", "tu8#BeW7"));
