//const api = require("./aurion_api");
const axios = require("axios").default;
// const xml2js = require('xml2js').parseString;
// const util = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const siteUrl = "https://aurion.junia.com/";
const sessionId = getSessionId("nathhmn@gmail.com", "s6KyMHQKgNHVsJp");
console.log(sessionId);

function getSessionId(username, password) {
    axios
        .post(`${siteUrl}login`, {
            username: "nathan.eudeline@student.junia.com",
            password: "tu8%23BeW7",
        })
        .then(function (response) {
            //console.log(response);
            let cookies = response.headers["set-cookie"];
            let newSessionId = cookies[0].substring(11, 43);
            console.log(newSessionId);

            return newSessionId;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPlanning(sessionId) {
    let data = [];
    axios
        .get(`${siteUrl}faces/Planning.xhtml`, {
            Cookie: sessionId,
        })
        .then(function (response) {
            const body = response.data;

            let from = 'id="j_id1:javax.faces.ViewState:0" value="';
            let to = '" autocomplete="off" />\n</form></div></body>';

            data[0] = "success";
            data[1] = body.substring(
                body.indexOf(from) + from.length,
                body.indexOf(to)
            );
            console.log(data[1]);

            from = '<div id="form:j_idt';
            to = '" class="schedule">';
            let view;
            if (body.indexOf(to) != -1 && body.indexOf(from) != -1) {
                let tmpSubstring = body.substring(
                    body.indexOf(to) - 50,
                    body.indexOf(to) + to.length()
                );
                view = tmpSubstring.substring(
                    tmpSubstring.indexOf(from) + from.length,
                    tmpSubstring.indexOf(to)
                );
            }

            // setTimeout(() => {
            //     zib(sessionId, data[1].replace(":", "%3A"));
            // }, 5000);

            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return data;
}

function getCalendarAsXML(sessionId, weekIndex) {
    const now = Date.now.getMilliseconds();
    let onejan = new Date(this.getFullYear(), 0, 1);
    let millisecsInDay = 86400000;
    const weekOfYear = Math.ceil(
        ((this - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
    );
    const offset = (weekIndex - weekOfYear) * 7 * 24 * 60 * 60 * 1000;
    const start =
        now -
        ((now + 3 * 24 * 60 * 60 * 1000) % (7 * 24 * 60 * 60 * 1000)) +
        offset;
    const end = start + 6 * 24 * 60 * 60 * 1000;

    let defaultfield;
    const fields = new Map();
    let fieldsArray = [];

    let data = getPlanning(sessionId);

    defaultFields =
        "javax.faces.partial.ajax=true" +
        "&javax.faces.source=form%3Aj_idt" +
        data[2] +
        "&javax.faces.partial.execute=form%3Aj_idt" +
        data[2] +
        "&javax.faces.partial.render=form%3Aj_idt" +
        data[2] +
        "&form%3Aj_idt" +
        data[2] +
        "=form%3Aj_idt" +
        data[2] +
        "&form%3Aj_idt" +
        data[2] +
        "_start=" +
        start +
        "&form%3Aj_idt" +
        data[2] +
        "_end=" +
        end +
        "&form=form" +
        "&form%3Adate_input=" +
        df.format(start).replace("/", "%2F") +
        "&form%3Aweek=" +
        weekIndex +
        "-" +
        Calendar.getInstance().get(Calendar.YEAR);
    fields.clear();
    fieldsArray = defaultFields.split("&");
    for (let i = 0; i < fieldsArray.length; i++) {
        let keyVal = fieldsArray[i].split("=");
        if (keyVal.length == 2) fields.put(keyVal[0], keyVal[1]);
    }

    axios.post();
}

function getRealPlanning(sessionId) {
    const now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let millisecsInDay = 86400000;
    const weekOfYear = Math.ceil(
        ((this - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
    );
    const offset = (26 - weekOfYear) * 7 * 24 * 60 * 60 * 1000;
    const start =
        now -
        ((now + 3 * 24 * 60 * 60 * 1000) % (7 * 24 * 60 * 60 * 1000)) +
        offset;
    const end = start + 6 * 24 * 60 * 60 * 1000;
    let dataPlanning = getPlanning(sessionId);
    console.log(dataPlanning[2]);

    axios
        .post(`${siteUrl}faces/Planning.xhtml`, {
            Cookie: sessionId,
            "javax.faces.partial.ajax": true,
            "javax.faces.source": "form:j_idt117",
            "javax.faces.partial.execute": "form:j_idt117",
            "javax.faces.partial.render": "form:j_idt117",
            "form:j_idt117": "form:j_idt117",
            "form:j_idt117_start": start,
            "form:j_idt117_end": end,
            form: "form",
            "form:largeurDivCenter": "",
            "form:date_input": `${pad(now.getUTCDate())}/${pad(
                now.getUTCMonth()
            )}/${pad(now.getUTCFullYear())}`,
            "form:week":
                Math.ceil(
                    ((now - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
                ) -
                1 +
                "-" +
                now.getUTCFullYear(),
            "form:j_idt117_view": "agendaWeek",
            "form:offsetFuseauNavigateur": -7200000,
            "form:onglets_activeIndex": 0,
            "form:onglets_scrollState": 0,
            "form:j_idt236_focus": "",
            "form:j_idt236_input": 44323,
            "javax.faces.ViewState": dataPlanning[2],
            /*"form": "form",
        "form:date_input": `${pad(now.getUTCDate())}/${pad(now.getUTCMonth())}/${pad(now.getUTCFullYear())}`,
        "form:j_idt117_view": "agendaWeek",
        "form:week": Math.ceil((((now - onejan) /millisecsInDay) + onejan.getDay()+1)/7) - 1 + "-" + now.getUTCFullYear(),
        "javax.faces.partial.ajax": true,
        "javax.faces.partial.execute": "form:j_idt117",
        "javax.faces.partial.render": "form:j_idt117",
        "javax.faces.source": "form:j_idt117",
        "javax.faces.ViewState": "3889272191905277586:5173789198342280665",
        "form:offsetFuseauNavigateur": -7200000, 
        "form:j_idt117": "form:j_idt117",
        "form:j_idt117_end": 1632002400000,
        "form:j_idt117_start": 1631484000000*/
        })
        .then(function (response) {
            let data = response.data;
            console.log(response.status);
            console.log(response.headers["content-type"]);
            console.log(response.headers["content-length"]);
            console.log(response.data.length);
            // xml2js(data, function (err, result) {

            //     console.log(util.inspect(result, false, null));
            // });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function zib(sessionId, view) {
    var url = "https://aurion.junia.com/faces/Planning.xhtml";
    console.log(view);

    var xhr = new XMLHttpRequest();
    xhr.setDisableHeaderCheck(true);
    xhr.open("POST", url);

    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("sec-ch-ua-mobile", "?0");
    xhr.setRequestHeader(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36"
    );
    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
    );
    xhr.setRequestHeader("Accept", "application/xml, text/xml, */*; q=0.01");
    xhr.setRequestHeader("Faces-Request", "partial/ajax");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("sec-ch-ua-platform", "Windows");
    xhr.setRequestHeader("Origin", "https://aurion.junia.com");
    xhr.setRequestHeader("Sec-Fetch-Site", "same-origin");
    xhr.setRequestHeader("Sec-Fetch-Mode", "cors");
    xhr.setRequestHeader("Sec-Fetch-Dest", "empty");
    xhr.setRequestHeader(
        "Referer",
        "https://aurion.junia.com/faces/Planning.xhtml"
    );
    xhr.setRequestHeader(
        "Accept-Language",
        "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
    );
    console.log("JSESSIONID=" + sessionId);
    xhr.setRequestHeader("Cookie", "JSESSIONID=" + sessionId);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    var data =
        "javax.faces.partial.ajax=true&javax.faces.source=form%3Aj_idt117&javax.faces.partial.execute=form%3Aj_idt117&javax.faces.partial.render=form%3Aj_idt117&form%3Aj_idt117=form%3Aj_idt117&form%3Aj_idt117_start=1633298400000&form%3Aj_idt117_end=1633816800000&form=form&form%3AlargeurDivCenter=&form%3Adate_input=04%2F10%2F2021&form%3Aweek=40-2021&form%3Aj_idt117_view=agendaWeek&form%3AoffsetFuseauNavigateur=-7200000&form%3Aonglets_activeIndex=0&form%3Aonglets_scrollState=0&form%3Aj_idt236_focus=&form%3Aj_idt236_input=44323&javax.faces.ViewState=" +
        view;

    xhr.send(data);
}
