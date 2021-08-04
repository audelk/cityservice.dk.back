export default class RequestModel {
    constructor() {
        this.headers = {
            'X-RestLi-Protocol-Version': '2.0.0',
            'X-Requested-With': 'XMLHttpRequest',
            'X-LI-Track': '{"clientVersion":"1.1.6127","osName":"web","timezoneOffset":8,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
            'x-li-prefetch': '1',
            'X-LI-Lang': 'en_US',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
            Referer: 'https://www.linkedin.com/mynetwork/invite-connect/connections/',
            Host: 'www.linkedin.com',
            'Csrf-Token': 'ajax:8532840949075403120',
            Cookie: 'liap=true;lidc="b=SB92:g=66:u=22:i=1524759898:t=1524789407:s=AQGUloaKku4Ro-plIXcf5t6UaADPhSNf";leo_auth_token="GST:9y4u2XpAhvjGE-GHPgFpPCWeaWsOgDHyWpShP0tLuyISYVDiEuLeFd:1524759897:3e7faea7f283fc783d504b61b406c778cbc4bbc3";bcookie="v=2&ee575d8f-b7b8-42de-85c1-438e15afc3c5";bscookie="v=1&20180426162454dd469513-4983-4aa5-8a04-5e0fdee8d2e3AQFQPcKpw_ZMfMV-5yfOGgkv0G1Ws7Nu";_ga=GA1.2.1624376373.1524759891;_gat=1;sl="v=1&6ZOKY";visit="v=1&G";lang="v=2&lang=en-us";JSESSIONID="ajax:8532840949075403120";li_at=AQEDASLs6vgDn8sjAAABYwLFp08AAAFjJtIrT1EAKR6iz8EZHZDxJztVGWMLyAuFTfzHsrmyWgV_t07CgSK_ooAtmkq9Yil6PcciUKQ57EAMaRe1TLQB3gMMXNF8oPV99NEy_AmKPlIGl2gh1O9xyLHr;RT=s=1524759893229&r=https%3A%2F%2Fwww.linkedin.com%2F;',
            Connection: 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Accept: 'application/vnd.linkedin.normalized+json',

        }
        this.headersNavSales = {
            Referer: 'https://www.linkedin.com/sales/search/people?countryCode=us&industry=77&logHistory=false&logId=2614656456&page=2&radius=25&relationship=S%2CO&searchSessionId=5IS85L7eRcCgdX%2BhMaAixQ%3D%3D&yearsOfExperience=2%2C3%2C4%2C5&zips=95694',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134',
            Accept: '*/*',
            'X-LI-Lang': 'en_US',
            'X-li-page-instance': 'urn:li:page:d_sales2_search_company;Pu0GRAUbT1GG2dGlybJ6kw==',
            'X-RestLi-Protocol-Version': '2.0.0',
            'x-li-identity': 'dXJuOmxpOm1lbWJlcjoxNjkwMjg5NA',
            'Csrf-Token': 'ajax:3585627615415874390',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'www.linkedin.com',
            'Connection': 'Keep-Alive',
            'Cookie': 'lidc="b=OB94:g=942:u=139:i=1536915934:t=1536982563:s=AQGG1Kh1_m6uylb09Ff0Icg7Ab4dGvS2"; li_oatml=AQHFxGNN7clYJwAAAWXVpt_ZCsXMGUWB7YzrXQSJJ6Agq44SW8eVWukJ215BCdquK-iHSL8HtLxnLo_ZJjM-nt9hPlovSvGT; liap=true; bcookie="v=2&5fad222d-d4c1-4cfe-82b0-96f535bb3c35"; _ga=GA1.2.282131304.1536887582; _guid=6b522851-9283-47fa-95c1-fd676d4f216f; _lipt=CwEAAAFl1cuoJcdT3s4R_Aax2mSaGk0GScXPMxCdlHDiB76CeAQu3UnCMjgMtDU9Xxk2chLc2k8uQuhtT8ZiMYa9ZELW5StzayHhQD48KNhl1Epj41LzvKcU5P1C0v_KkdVc9y8dVja1tW0WLaO4Fg8ngLbBlqHfiseA9UoruBruYE3ODNP7VZrscMWsQQVxBnVv0Oi0NbzTyPPTeFXRdlranrosK_ZEMPUnhPrZDW7WpfNrq8iZElm5tV_a7LSTPejQwhtmddWvXXAtO2Nb0lkjKyQmiL9BdE_CwDalDseoS8FLEZ_sd2o-awh0VAa77ZMTPg1f407wKOi0PLfyvf8fPr1pROcnbZZT45ZdcQtxqvyOBkGGp8I41e1s324H02vOF2v9IrxN9EZ5FO45FkV8ls1oFzQC; lang="v=2&lang=en-us"; sdsc=22%3A1%2C1536916139339%7ECAOR%2C0e%2BOyQEZ2tbg3hKO9lXece8EsuhU%3D; li_at=AQEDAQEB6u4Esl6zAAABZdWfT6IAAAFl-avTolEArP0UyyrkUaYdr7wG9qRuOAb8WNq8SPF2VaAmyNQa6SPCCWiZ7jzmFqC9_iAcSeyZ9pg-5Tajk7BGGqMck1STrdFbDBdaZUpMZMCKs0z9ylB2j4I8; li_a=AQJ2PTEmc2FsZXNfY2lkPTU2ODUwNjQwNyUzQSUzQTE0NjIzNTIwN18E_I873sUFg3GOtP8GHBhGPKNr; JSESSIONID="ajax:3585627615415874390"; sl="v=1&ekFcp"; visit="v=1&M"; bscookie="v=1&201809140107549abad2c7-9abb-4671-8dee-6058d6130844AQHBWrtTq3aMOvz5fPMGU91nGcCkAU5I"',

        }
        this.headerSalesSettings = {
            Referer: 'https://www.linkedin.com/sales/search/people?countryCode=us&industry=77&logHistory=false&logId=2614656456&page=2&radius=25&relationship=S%2CO&searchSessionId=5IS85L7eRcCgdX%2BhMaAixQ%3D%3D&yearsOfExperience=2%2C3%2C4%2C5&zips=95694',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134',
            Accept: '*/*',
            'X-LI-Lang': 'en_US',
            'X-li-page-instance': 'urn:li:page:d_sales2_search_company;Pu0GRAUbT1GG2dGlybJ6kw==',
            'X-RestLi-Protocol-Version': '2.0.0',
            'x-li-identity': 'dXJuOmxpOm1lbWJlcjoxNjkwMjg5NA',
            'Csrf-Token': 'ajax:3585627615415874390',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'www.linkedin.com',
            'Connection': 'Keep-Alive',
            'Cookie': 'lidc="b=OB94:g=942:u=139:i=1536915934:t=1536982563:s=AQGG1Kh1_m6uylb09Ff0Icg7Ab4dGvS2"; li_oatml=AQHFxGNN7clYJwAAAWXVpt_ZCsXMGUWB7YzrXQSJJ6Agq44SW8eVWukJ215BCdquK-iHSL8HtLxnLo_ZJjM-nt9hPlovSvGT; liap=true; bcookie="v=2&5fad222d-d4c1-4cfe-82b0-96f535bb3c35"; _ga=GA1.2.282131304.1536887582; _guid=6b522851-9283-47fa-95c1-fd676d4f216f; _lipt=CwEAAAFl1cuoJcdT3s4R_Aax2mSaGk0GScXPMxCdlHDiB76CeAQu3UnCMjgMtDU9Xxk2chLc2k8uQuhtT8ZiMYa9ZELW5StzayHhQD48KNhl1Epj41LzvKcU5P1C0v_KkdVc9y8dVja1tW0WLaO4Fg8ngLbBlqHfiseA9UoruBruYE3ODNP7VZrscMWsQQVxBnVv0Oi0NbzTyPPTeFXRdlranrosK_ZEMPUnhPrZDW7WpfNrq8iZElm5tV_a7LSTPejQwhtmddWvXXAtO2Nb0lkjKyQmiL9BdE_CwDalDseoS8FLEZ_sd2o-awh0VAa77ZMTPg1f407wKOi0PLfyvf8fPr1pROcnbZZT45ZdcQtxqvyOBkGGp8I41e1s324H02vOF2v9IrxN9EZ5FO45FkV8ls1oFzQC; lang="v=2&lang=en-us"; sdsc=22%3A1%2C1536916139339%7ECAOR%2C0e%2BOyQEZ2tbg3hKO9lXece8EsuhU%3D; li_at=AQEDAQEB6u4Esl6zAAABZdWfT6IAAAFl-avTolEArP0UyyrkUaYdr7wG9qRuOAb8WNq8SPF2VaAmyNQa6SPCCWiZ7jzmFqC9_iAcSeyZ9pg-5Tajk7BGGqMck1STrdFbDBdaZUpMZMCKs0z9ylB2j4I8; li_a=AQJ2PTEmc2FsZXNfY2lkPTU2ODUwNjQwNyUzQSUzQTE0NjIzNTIwN18E_I873sUFg3GOtP8GHBhGPKNr; JSESSIONID="ajax:3585627615415874390"; sl="v=1&ekFcp"; visit="v=1&M"; bscookie="v=1&201809140107549abad2c7-9abb-4671-8dee-6058d6130844AQHBWrtTq3aMOvz5fPMGU91nGcCkAU5I"',

        }
        this.getPageOption = {
            'method': 'GET',
            'gzip': true,
            'url': 'https://www.linkedin.com/sales/search/people?doFetchHeroCard=false&functionIncluded=4%2C25&geoIncluded=103644278&keywords=independent%20sales&logHistory=false&page=3&preserveScrollPosition=false&rsLogId=659411745&searchSessionId=rTdf8b1lQcGdJdAEXvQQbg%3D%3D&seniorityIncluded=8%2C9',
            'headers': {
                'Host': 'www.linkedin.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'x-li-lang': 'en_US',
                'x-li-page-instance': 'urn:li:page:d_sales2_search_people;7tw1wE7cTh+IbNtnFH4FjA==',
                'x-restli-protocol-version': '2.0.0',
                'x-li-identity': 'dXJuOmxpOmVudGVycHJpc2VQcm9maWxlOih1cm46bGk6ZW50ZXJwcmlzZUFjY291bnQ6ODEyMzk3NzcsMTA5NTA3NTYxKQ',
                'csrf-token': 'ajax:1844233528035580147',
                'Connection': 'keep-alive',
                'Referer': 'https://www.linkedin.com/sales/search/people?doFetchHeroCard=false&functionIncluded=4%2C25&geoIncluded=103644278&keywords=independent%20sales&logHistory=false&page=2&preserveScrollPosition=false&rsLogId=659411745&searchSessionId=rTdf8b1lQcGdJdAEXvQQbg%3D%3D&seniorityIncluded=8%2C9',
                'Cookie': 'bcookie="v=2&1a111e74-8186-4e0c-859f-207b8f0ae743"; bscookie="v=1&20210126231410b7d7a126-0d29-418d-8681-8c23a28d33f5AQGdjN0NWXgA7_8wmTG2uhOUmr8pUA9k"; lissc=1; _ga=GA1.2.1021549010.1611701945; G_ENABLED_IDPS=google; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18668%7CvVersion%7C5.1.1%7CMCMID%7C23108063243355914201741144572653947328%7CMCAAMLH-1613542689%7C9%7CMCAAMB-1613542689%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1612945089s%7CNONE%7CMCCIDH%7C-1134812618; li_rm=AQFdJTRkjoi_JwAAAXdA-fw1oBCGlDjWiF0AGaK6raR1jn1lG58TsFtSU2LUB-JHQYKJF5hWgDAV2y3o6Qod_oEoR8FCYNTA6y8xKqs4xtX2rCn4zZZ91sSN; UserMatchHistory=AQL0tc90z0VxIQAAAXeKpUp0mVRUUw8r6pEQSdH5J2lB9exhDxgdXqj74-rtS3n9sdFtd0fmVXR7g7Qh8UrzWr45LpUg4tWgdrE0UXaRfb5Weo_pbravcWLtZtOHLb1mG8If0Q7ObRcDXGJdzy-BeZujn1_dlvmAX6BX2SmbYFS_2a-pypc-hsZY1LEg04ELUVqu5uOuDJRxpDSGHc5z0nJ578nk1uGvCf7PXX7w0JE8L49wYGtXSW-rq7ZPX_8-NO2FEXakCzoS8dAL6JWq6xtHocfk8J05sLSp; li_sugr=a29c3e6b-9580-49d6-a2ac-423c00143e9c; li_oatml=AQF1vuZCZ3oGEQAAAXeE-fQjQCPaBJGlY28Tc_wIwcXvnnJm9B_QFkJWpCYmVQRvYDJHPGwNyP-_gV5XrXUaLe1vXrqREb68; aam_uuid=23684856544030423591794375485372873227; visit=v=1&M; _gid=GA1.2.620608263.1612312858; g_state={"i_p":1612658785935,"i_l":2}; lidc="b=TB87:s=T:r=T:g=2517:u=86:i=1612938830:t=1613001458:v=1:sig=AQEWTIJTVg8z3HH3ujNqM1DccIJV6ESH"; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; lang=v=2&lang=en-us; JSESSIONID="ajax:1844233528035580147"; liap=true; li_at=AQEFALoBAAAAAATaJ1sAAAF3iTqnDAAAAXetR4LmTgAAXXVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjgxMjM5Nzc3LDEwOTUwNzU2MSledXJuOmxpOm1lbWJlcjoyNDY0NTI4NzSKIy4nLBz3Z7zZxxBndFH5yxAtLu555AjV4Y4lGoXJV7SvDp-K26VXqzyy_xu_IDKYxe0IVn93nJ6mqNBPG7cIZS0RZiu9XhQQIgrLFMghonlySJ7zvk44CTPZW66yQID9H6i61jgosFXVsvOoktzjKQD25Tl_09LzrR2qmv574dRy_kwBmAU7FtJNFEn8tIYjeJo; li_ep_auth_context=AFVhcHA9c2FsZXNOYXZpZ2F0b3IsYWlkPTgxMjM5Nzc3LGlpZD05NjgxNTc2OSxwaWQ9MTA5NTA3NTYxLGV4cD0xNjE1NTA3MDgwOTU1LGN1cj10cnVlASSvNaNSJPBaKpKGEGtxUqhe_w0X; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODE1NzY5JTNBJTNBOTY3OTg2MDElM0ElM0F0aWVyMSUzQSUzQTgxMjM5Nzc3LSkMRmYCgPnZzqqQuoJ3v_oXyGg'
            }
        }
        this.headersNavSalesInvite = {
            Connection: 'keep-alive',
            Cookie: '_lipt=CwEAAAFjs_wTeBm7oqrDjKeTlz1nn_DoU-DnXQDhb2hYFtx2WLUSQ-GCj_YuP2ySFaxHYohZguCWBcTCugjCrH0R1WU7tO1m06jBo64WWnOu-j29H7cq-_qCqenkdrQuEjdvOelpyWrFnXw7KBm9TMAtskY4UO5sPv86q4Ja-pkkFgEagavq0wAfpG9rqvGSIfRZyjOtatU;sdsc=22%3A1%2C1527733034209%7ECAOR%2C0WJdgxtWbk%2BDtmT9KPn8eY%2BVmqrI%3D;RT=s=1527733027365&r=https%3A%2F%2Fwww.linkedin.com%2F;JSESSIONID=\\"ajax:3255201537919731740\\";liap=true;li_at=AQEDASLs6vgFzT1EAAABY7P8AB4AAAFj2AiEHk4ASU_yuFi2o9-LmjcPvZvIXOlP6WzkvtO_HGQIjepmrBIW5Tt6lPqOJadvR8N4Nz0rwXpK6kb5N87f3be8I6AxBu9XvNKXqakxTh8E-Ev2PwzcYF_q;sl=\\"v=1&EIfBU\\";leo_auth_token=\\"GST:95IrR17rpl7BhCgJ30sMz3e-L9cweiemRXsYR5qiDzEJsCo-T0TQ8S:1527733026:27d3cb1b8c1d60f40d623f34a8908be5a95abc6b\\";li_a=AQJ2PTEmc2FsZXNfY2lkPTM0OTIxNDMwMiUzQSUzQTExMDA1MjcwMnXZ5ofX2iMcdIIlBrb--cVuePjG;lang=\\"v=2&lang=en-us\\";_gat=1;_guid=835825c0-36f1-4959-97c5-c40429f57420;visit=\\"v=1&G\\";lidc=\\"b=OB92:g=828:u=36:i=1527733031:t=1527815699:s=AQEEvW6HM6RNKm1SPku6ZuG3vPR4AERc\\";_ga=GA1.2.18362925.1527733024;bscookie=\\"v=1&20180531021703112a6e7f-a19e-4fcc-8048-30caa5627bcbAQEIseSwHkq0OitUn-1lbFfMCExOiFMf\\";bcookie=\\"v=2&794e2af6-1ad0-4ea6-8265-ed31fe6d6b00\\";\'',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            Referer: 'https://www.linkedin.com/sales/search?keywords=architect&facet=G&facet.G=ph%3A9233&count=25&start=25&updateHistory=true&searchHistoryId=2368606286&trackingInfoJson.contextId=70C88502B2953315B0AFB54EF82A0000',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            Host: 'www.linkedin.com'
        };
        this.InvitationSummary = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/invitationsSummary',
            gzip: true,
        }
        this.InviteCancel = {
            method: 'POST',
            url: 'https://www.linkedin.com/voyager/api/relationships/invitations?action=closeInvitations',
            gzip: true,
            body: ''
        }
        this.Invite = {
            method: 'POST',
            url: 'https://www.linkedin.com/voyager/api/relationships/invitations?action=closeInvitations',
            gzip: true,
            body: ''
        }
        this.InviteSent = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/invitations?folder=SENT',
            gzip: true
        }

        //helpCenterUrl=&isFastArchiveOnly=true&requestedFiles%5B%5D=CONNECTIONS&csrfToken=ajax%3A2396661812542453184&password=curren805
        /*isFastArchiveOnly: true
        requestedFiles[]: CONNECTIONS
        csrfToken: ajax:2396661812542453184
        password: curren805
        */
        this.DataExport = {
            method: 'POST',
            url: 'https://www.linkedin.com/psettings/member-data/export',
            gzip: true,
        }

        this.DataDownload = {
            method: 'GET',
            url: 'https://www.linkedin.com/psettings/member-data/download',
            gzip: true,
        }
        this.ViewUserProfile = {
            method: 'GET',
            url: 'https://www.linkedin.com/tscp-serving/dtag?sz=300x250&ti=2&p=1&c=1&z=profile&pk=d_flagship3_profile_view_base&pz=BR&vmid=ACoAAA2XO6oB6Jiz4mFTDNa5PmcDXtcqzM77-6o',
            gzip: true,
        }

        //https: //www.linkedin.com/voyager/api/growth/normInvitations

        this.ConnectionSummary = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/connectionsSummary',
            gzip: true,
        }
        this.Connections = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/connections?',
            gzip: true,

        }
        this.SimpleGet = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/connections?',
            gzip: true,
        }
        this.SimplePost = {
            method: 'POST',
            url: 'https://www.linkedin.com/voyager?',
            gzip: true,
        }
        this.SimplePut = {
            method: 'PUT',
            url: 'https://www.linkedin.com/voyager?',
            gzip: true,

        }
        this.InvitationsSummaryV2 = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/invitationsSummaryV2?',
            gzip: true,

        }
        this.InvitationsSent = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/relationships/sentInvitationView?',
            gzip: true,

        }
        this.ConnectionSearch = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/search/cluster?',
            gzip: true,
        }


        this.ConversationsList = {
            method: 'GET',
            //https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=participants&recipients=List(ACoAAAtul4sBsnwbFFyfZFXv2aK0ZtbRY_HJa_Q)
            url: 'https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=participants&recipients=',
            gzip: true,
        }
        this.ConversationsLatest = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=search',
            gzip: true,
        }
        this.ConversationsCreatedBefore = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX',
            gzip: true,
        }
        this.LinkedinGroups = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/groups/groups?membershipStatuses=List(MANAGER,MEMBER,OWNER)&q=member',
            gzip: true,

        }
        this.SalesMailBox = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiMailbox?decoration=%28entityUrn%2CuniqueId%2Csubject%2Cbody%2CblockCopy%2CfooterText%2Cread%2CitemType%2CcustomPropertyType%2CsalesMessageType%2CitemStatus%2Creplied%2Cinbox%2Cpending%2Carchived%2CcreatedDate%2ClastModified%2Cattachments*%28name%2CmediaId%2CmimeType%2Csize%2Creference%2CattachmentUrn%29%2Cfrom~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%29%2CtoGroup*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%29%29&count=20&q=findMailboxItems',
            gzip: true,
        }
        this.SalesMailBoxThreadStart = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiMailbox?decoration=%28uniqueId%2Csubject%2Cbody%2CblockCopy%2CfooterText%2Cread%2CitemType%2CcustomPropertyType%2CsalesMessageType%2CinmailRestriction%2CitemStatus%2Creplied%2Cinbox%2Cpending%2Carchived%2CcreatedDate%2ClastModified%2CentityUrn%2Cattachments*%28name%2CmediaId%2CmimeType%2Csize%2Creference%2CattachmentUrn%29%2Cfrom~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%29%2CtoGroup*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%2Cdegree%29%29&count=10&q=member',
            gzip: true,
        }
        this.SalesMailBoxThread = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiMailbox?decoration=%28uniqueId%2Csubject%2Cbody%2CblockCopy%2CfooterText%2Cread%2CitemType%2CcustomPropertyType%2CsalesMessageType%2CinmailRestriction%2CitemStatus%2Creplied%2Cinbox%2Cpending%2Carchived%2CcreatedDate%2ClastModified%2CentityUrn%2Cattachments*%28name%2CmediaId%2CmimeType%2Csize%2Creference%2CattachmentUrn%29%2Cfrom~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%29%2CtoGroup*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%2Cdegree%29%29&count=10',
            gzip: true,
        }
        this.SalesProfile = {
                method: "GET",
                url: 'https://www.linkedin.com/sales-api/salesApiNavChrome?decoration\u003D%28baseMprUrl%2CbaseScdsUrl%2CviewerPrivacy%2CviewerSalesUrn%2Cadmin%2CadminOnly%2CshowAdminSettings%2CshowDealbook%2CshowSeatManagement%2CshowSettings%2CshowUsageReporting%2CunreadMessagesCount%2CsalesMailboxCount%2ClinkedInMailboxCount%2CunseenNotificationsCount%2CsavedSearchesNewHitCount%2Conboarded%2Cmember~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CprofilePictureDisplayImage%2CpictureInfo%28croppedImage%29%2CobjectUrn%29%2CseatSources*%2CseatRoles*%2CepAccountId%2CepApplicationInstanceId%2ChomepageOptOut%29',
                gzip: true
            }
            // https: //www.linkedin.com/sales-api/salesApiMailbox?          decoration=%28uniqueId%2Csubject%2Cbody%2CblockCopy%2CfooterText%2Cread%2CitemType%2CcustomPropertyType%2CsalesMessageType%2CinmailRestriction%2CitemStatus%2Creplied%2Cinbox%2Cpending%2Carchived%2CcreatedDate%2ClastModified%2CentityUrn%2Cattachments*%28name%2CmediaId%2CmimeType%2Csize%2Creference%2CattachmentUrn%29%2Cfrom~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%29%2CtoGroup*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2Cheadline%2CpictureInfo%2CprofilePictureDisplayImage%2CmemberBadges%2Cdegree%29%29&count=10&profileId=ACwAAB4eoMgBLTnJtRwc20ylYHVqfis_rAIR2Y0&q=member
        this.SalesProfileContact = {
            method: "GET",
            url: 'https://www.linkedin.com/voyager/api/identity/dash/profiles?q\u003DmemberIdentity\u0026memberIdentity\u003Dssegawa-charles-96332a2a\u0026decorationId\u003Dcom.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-53',
            gzip: true
        }
        this.ConversationsEvents = {
            method: 'GET',
            //https://www.linkedin.com/voyager/api/messaging/conversations/6395319234741792768/events
            url: 'https://www.linkedin.com/voyager/api/messaging/conversations/',
            gzip: true,
        }
        this.ConnectionProfileContactInfo = {
            method: 'GET',
            // https://www.linkedin.com/voyager/api/identity/profiles/lakhwinder-kaur-3a485940/profileContactInfo
            url: 'https://www.linkedin.com/voyager/api/identity/profiles/',
            gzip: true,
        }

        this.ConnectionProfileMain = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/dash/profiles?q\u003DmemberIdentity\u0026memberIdentity\u003Djayne-kumar-5023247\u0026decorationId\u003Dcom.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-57',
            gzip: true,
        }
        this.getSSI = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales/ssi',
            gzip: true
        }
        this.GlobalSearch = {
            method: 'GET',
            url: 'https://www.linkedin.com/voyager/api/search/cluster?',
            gzip: true,
        }
        this.SearchSalesNav = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales/search/results?',
            gzip: true,
        }
        this.SalesSettings = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales/search/results?',
            gzip: true,
        }
        this.SalesSavedSearches = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiSavedSearches?q=savedSearches',
            gzip: true,
        }
        this.SalesSavedAccountSearches = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiSavedSearchesV2?decoration=%28createdAt%2Cfrequency%2Cid%2Cname%2CnewHitsCount%2Cseat%29&q=savedCompanySearches',
            gzip: true,
        }
        this.SalesSavedLeadList = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiLists?q=listType&listType=LEAD&isMetadataNeeded=true&sortCriteria=LAST_MODIFIED&sortOrder=DESCENDING&ownership=OWNED_BY_VIEWER&decoration=%28id%2ClistType%2Ccreator%2Cdescription%2Cname%2Crole%2ClastModifiedAt%2ClastViewedAt%2CentityCount%2CunsavedEntityCount%2CtopEntities*~fs_salesProfile%28entityUrn%2CprofilePictureDisplayImage%29%29',
            gzip: true,
        }
        this.SalesSavedAccountList = {
            method: 'GET',
            url: 'https://www.linkedin.com/sales-api/salesApiLists?q=listType&listType=ACCOUNT&isMetadataNeeded=true&sortCriteria=LAST_MODIFIED&sortOrder=DESCENDING&ownership=OWNED_BY_VIEWER&decoration=%28id%2ClistType%2Ccreator%2Cdescription%2Cname%2Crole%2ClastModifiedAt%2ClastViewedAt%2CentityCount%2CunsavedEntityCount%2CtopEntities*~fs_salesProfile%28entityUrn%2CprofilePictureDisplayImage%29%29',
            gzip: true,
        }
        this.SearchHints = {
            method: 'GET',
            //https://www.linkedin.com/voyager/api/typeahead/hits?q=federated&query=santa&shouldUseSchoolParams=false&types=List(REGION)
            url: 'https://www.linkedin.com/voyager/api/typeahead/hits?',
            gzip: true,
        }
        this.SearchHintsSales = {
            method: 'GET',
            //https://www.linkedin.com/voyager/api/typeahead/hits?q=federated&query=santa&shouldUseSchoolParams=false&types=List(REGION)
            url: 'https://www.linkedin.com/sales-api/salesApiFacetTypeahead?',
            gzip: true,
        }
        this.SearchHintsDefaults = {
                method: 'GET',
                url: 'https://www.linkedin.com/voyager/api/search/facets?',
                gzip: true,
            }
            //https: //www.linkedin.com/voyager/api/search/facets?_bustCache=ember4648&guides=List(facetNetwork->F)&q=guided&requestedPeopleFacets=List(NETWORK,CURRENT_COMPANY,PAST_COMPANY,GEO_REGION,INDUSTRY,NONPROFIT_INTEREST,PROFILE_LANGUAGE,SCHOOL,CONNECTION_OF,PROFESSIONAL_EVENT)&shouldRequestFacetCounts=false

        this.ConversationsCreate = {
            method: 'POST',
            url: 'https://www.linkedin.com/voyager/api/messaging/conversations?action=create',
            gzip: true,
            headers: {
                'X-RestLi-Protocol-Version': '2.0.0',
                'X-Requested-With': 'XMLHttpRequest',
                'X-LI-Track': '{"clientVersion":"1.1.6127","osName":"web","timezoneOffset":8,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
                'x-li-prefetch': '1',
                'X-LI-Lang': 'en_US',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
                referer: 'https://www.linkedin.com/mynetwork/invite-connect/connections/',
                origin: 'https://www.linkedin.com',
                Cookie: '',
                'Csrf-Token': 'ajax:3183175983739344778',
                'Content-Type': 'application/json; charset=utf-8',
                // 'content-length': '260',
                'cache-control': 'max-age=0',
                'accept-language': 'en-US,en;q=0.9',
                Connection: 'keep-alive',
                'accept-encoding': 'gzip, deflate, br',
                Accept: '*/*'
            },
            body: ''
        }
        this.InviteNorm = {
            method: 'POST',
            url: 'https://www.linkedin.com/voyager/api/growth/normInvitations',
            gzip: true,
            body: ''
        }
        this.InviteSalesNav = {
            method: 'POST',
            url: 'https://www.linkedin.com/sales-api/salesApiConnection',
            body: "",
            gzip: true,
        }
        this.SalesSendMessage = {
            method: 'POST',
            url: 'https://www.linkedin.com/sales-api/salesApiMessaging?action=sendMessage',
            body: "",
            gzip: true,
        }
        this.ContactBot = {
            method: 'POST',
            //  url: 'http://127.0.0.1:4000/',
            url: 'http://13.59.237.117:4000/',
            gzip: true,
            body: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
        this.BackendApi = {
            method: 'GET',
            url: 'http://app.sparktalk.io/backendv2/api/sendEmailAccountStatus',
            qs: { accountID: '1' },
            headers: {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'accept-encoding': 'gzip, deflate',
                Host: 'app.sparktalk.io',
                'Postman-Token': '85b998c9-49ea-4a1d-9bde-e1c307f2cb9a,26733e4a-08d8-439e-87b4-a2a532a474f7',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.15.0'
            }


        }
        this.getSSI.headers = this.headers;
        this.DataExport.headers = this.headers;
        this.DataDownload.headers = this.headers;
        this.ConnectionSummary.headers = this.headers;
        this.Connections.headers = this.headers;
        this.SimpleGet.headers = this.headers;
        this.SimplePost.headers = this.headers;
        this.SimplePut.headers = this.headers;
        this.InvitationsSent.headers = this.headers;
        this.InvitationsSummaryV2.headers = this.headers;
        this.InviteNorm.headers = this.headers;
        this.ConnectionSearch.headers = this.headers;
        this.GlobalSearch.headers = this.headers;
        this.InvitationSummary.headers = this.headers;
        this.InviteCancel.headers = this.headers;
        this.Invite.headers = this.headers;
        this.InviteSent.headers = this.headers;
        this.ConversationsList.headers = this.headers;
        this.ConversationsLatest.headers = this.headers;
        this.ConversationsCreatedBefore.headers = this.headers;
        this.SalesMailBox.headers = this.headers;
        this.SalesMailBoxThread.headers = this.headers;
        this.SalesMailBoxThreadStart.headers = this.headers;
        this.SalesProfile.headers = this.headers;
        this.SalesProfileContact.headers = this.headers;
        this.ConversationsEvents.headers = this.headers;
        this.ConnectionProfileContactInfo.headers = this.headers;
        this.SearchHints.headers = this.headers;
        this.SearchHintsSales.headers = this.headersNavSales;
        this.SearchHintsDefaults.headers = this.headers;
        this.SearchSalesNav.headers = this.headersNavSales;
        this.InviteSalesNav.headers = this.headers;
        this.SalesSendMessage.headers = this.headers;
        this.SalesSettings.headers = this.headerSalesSettings;
        this.SalesSavedSearches.headers = this.headersNavSales;
        this.SalesSavedAccountSearches.headers = this.headersNavSales;
        this.SalesSavedLeadList.headers = this.headersNavSales;
        this.SalesSavedAccountList.headers = this.headersNavSales;
        this.LinkedinGroups.headers = this.headers;
        // this.Connections.headers.Accept = "application/vnd.linkedin.normalized+json+2.1";
        this.Conversation = {
            create: {
                method: 'POST',
                url: 'https://www.linkedin.com/voyager/api/messaging/conversations?action=create',
                headers: {
                    'X-RestLi-Protocol-Version': '2.0.0',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-LI-Track': '{\\"clientVersion\\":\\"1.1.6127\\",\\"osName\\":\\"web\\",\\"timezoneOffset\\":8,\\"deviceFormFactor\\":\\"DESKTOP\\",\\"mpName\\":\\"voyager-web\\"}',
                    'X-li-page-instance': 'urn:li:page:d_flagship3_people_connections;DXltyX98SDmFUUIkkt+chg==',
                    'X-LI-Lang': 'en_US',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
                    Referer: 'https://www.linkedin.com/mynetwork/invite-connect/connections/',
                    Host: 'www.linkedin.com',
                    'Csrf-Token': 'ajax:3183175983739344778',
                    Cookie: 'JSESSIONID=\\"ajax:3183175983739344778\\"; bcookie=\\"v=2&310fe014-9b5e-4136-8a0c-297a0296fbbb\\"; bscookie=\\"v=1&20180419015957195cc5d9-c4f6-4270-8259-82a24f3fc8f6AQF7HB5jJts2OH5GIybs64xETGOrr8Dk\\"; visit=\\"v=1&M\\"; _ga=GA1.2.659076300.1524103248; _guid=cd31a364-737d-4416-abe5-e009fa48d52c; _lipt=CwEAAAFjAvN3cGj_4lQ0Xi26WMfc4BCSecUCK94HCPCF5kr9BsyTIdLAmEE0d6dCRAy14umVK33w-IvAz8QDsIuQjen8e5pLIp7I6ERfV8eEbFXb5mMn4EvJgohun68IroI5KEMC4lvWqweUGknTpBVCXqsYDqxch36xowA04NnwChPYZH8f5cJm3DBa5d0; lidc=\\"b=OGST03:g=690:u=1:i=1524762918:t=1524849318:s=AQFvQJln4HxRo-MzrVIUR9dGySmZHvAo\\"; sl=\\"v=1&rPNqw\\"; li_at=AQEDASLs6vgFy5TRAAABYvg_awcAAAFjHEvvB1EAOOkoD15H4dQN-2eRXVB82cpjQPyPXfe1PZ_XX9SAD0N1bubYNulynvRTtLmRjKAZDURWomxvdFfFlqr2RLV36YDlbS7Yae4rU2OhCx3RR1j3JmXx; liap=true; lang=\\"v=2&lang=en-us\\"',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': '260',
                    Connection: 'keep-alive',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Accept: '*/*'
                },
                body: '{"conversationCreate":{"eventCreate":{"value":{"com.linkedin.voyager.messaging.create.MessageCreate":{"body":"good morning.","attachments":[]}}},"recipients":["ACoAAAIVrUYBEEem2gVo4vun0GPL3jBDsRMEG2A"],"subtype":"MEMBER_TO_MEMBER"},"keyVersion":"LEGACY_INBOX"}'
            }
        }

        this.SignInVerification = {
            method: 'POST',
            url: 'https://www.linkedin.com/uas/ato-pin-challenge-submit',
            headers: {
                //'user-agent': 'Chromeless 1.5.1',
                'upgrade-insecure-requests': '1',
                referer: 'https://www.linkedin.com/',
                origin: 'https://www.linkedin.com',
                cookie: '',
                'Content-Type': 'application/x-www-form-urlencoded',
                'content-length': '249',
                'cache-control': 'max-age=0',
                'accept-language': 'en-US,en;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
            form: {
                PinVerificationForm_pinParam: '112887',
                signin: 'Submit',
                'security-challenge-id': '359e1d15-ffa3-4eff-a7fc-fcb09c6865d9',
                dts: '0_03ZRie7BPf65hAjUz2o3of',
                origSourceAlias: '',
                csrfToken: 'ajax:7508989860736098520',
                sourceAlias: '0_0_BAGA7hBBYZrUgzMniVXEEMeViPB9pI-gyodAbALw3'
            }


        }

    }
}