//let piwikTracker = null;

//getPiwik();

export default {

    setViewPage(path) {
        try {
            let nowUrl = path || window.location.href;
            _paq.push(['setCustomUrl', nowUrl]);
            _paq.push(['setDocumentTitle', document.title]);
            _paq.push(['trackPageView']);

            _vds.trackPV();
        } catch (error) {

        }

    },
    pushTrack(array) {
        let nowUrl = window.location.href;
        _paq.push(['setCustomUrl', nowUrl]);
        _paq.push(array);
    }
};