import React, {MutableRefObject, useEffect} from "react";
import "./MapApplication.css"
import {Map} from "ol";
import {useRef} from "react/index";

const map = new Map()
function MapAppliction() {
    const mapref = useRef() as MutableRefObject<HTMLAnchorElement>

    useEffect(()=>{
        map.setTarget(mapref.current)
    }, [])
    return <>
        <header>
            <h1>Map Application</h1>
        </header>
        <nav>Actions</nav>
        <main ref={mapref}>Here is the map</main>
    </>
}
export default MapAppliction;