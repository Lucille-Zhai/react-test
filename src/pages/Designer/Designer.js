import React, {Component} from 'react';

import ToolBar from './Components/ToolBar/ToolBar';
import DrawPad from './Components/DrawPad/DrawPad';

export default class Designer extends Component {
    render () {
        return (
            <div className='designer'>
                <div className='designerTop'>
                    <ToolBar></ToolBar>
                </div>
                <div className='designerContent'>
                    <div className='designerLeft'>
                        <DrawPad></DrawPad>
                    </div>
                    <div className='designerRight'></div>
                </div>
            </div>
        );
    }
}