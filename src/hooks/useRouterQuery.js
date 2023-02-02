import {useLocation} from "@docusaurus/router";

function useRouterQuery() {
    return new URLSearchParams(useLocation().search);
}

export default useRouterQuery;