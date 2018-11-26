import Router from "next/router"

export const RouterHandler = ({index}) => {
    switch (index) {
        case 0:
            Router.replace({ pathname: "/about", query: { tab: 'ourstory' } })
            break;
        case 1:
            Router.replace({ pathname: "/about", query: { tab: 'ourchefs' } })
            break;
        case 2:
            Router.replace({ pathname: "/about", query: { tab: 'ourcontacts' } })
            break;
        case 3:
            Router.replace({ pathname: "/about", query: { tab: 'ourfaqs' } })
            break;
    }
}