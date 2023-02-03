import React from "react";

interface State {
    uid?: string;
    setUid?: (uid: string) => void;
}

export default React.createContext<State>(null);