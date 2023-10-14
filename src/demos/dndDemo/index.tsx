import { DndContext, useDraggable } from "@dnd-kit/core";

import { useDroppable } from '@dnd-kit/core';
import { List, theme } from "antd";
import React, { useState } from "react";


function Droppable(props: { id: string | number, transform?: string, children?: React.ReactNode }) {
    const token = theme.useToken()
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    })
    return (
        <div
            ref={setNodeRef}
            style={{
                backgroundColor: isOver ? token.token.colorPrimaryBg : undefined,
                transform: props.transform
            }}
        >
            {props.children}
        </div>
    );
}

function Draggable(props: { id: string | number, children?: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    return (
        <div
            ref={setNodeRef}
            style={
                {
                    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
                    cursor: 'move'
                }
            }
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    )
}

const listrow = ['1', '2', '3', '4', '5']


export function DndDemo(props: any) {
    const [list, setList] = useState(listrow);
    const [overId, setOver] = useState<number | undefined>(undefined);
    const [activeId, setactiveId] = useState<number | undefined>(undefined);
    return (
        <div style={{ overflow: "hidden", width: "100%", height: '100%' }}>
            <DndContext
                onDragEnd={(e) => {
                    if (e.over && (e.over?.id !== e.active.id)) {
                        const elements = list.splice(Number(e.active.id) - 1, 1);
                        const result = [
                            ...list.slice(0, Number(e.over.id) - 1),
                            ...elements,
                            ...list.slice(Number(e.over.id) - 1, list.length)
                        ]
                        setList(result)
                        setOver(undefined)
                    }
                }}
                onDragOver={(e) => {
                    if (e.over) {
                        setOver(Number(e.over.id))
                    }
                }}
                onDragStart={(e) => {
                    setactiveId(Number(e.active.id))
                }}
            >
                <List>
                    {
                        list.map(
                            (item, index) =>
                                <React.Fragment key={index} >
                                    <Droppable
                                        id={index + 1}
                                        transform={
                                            (overId === undefined || overId === activeId || activeId === undefined)
                                                ?
                                                undefined
                                                :
                                                (index + 1 > activeId && overId > activeId && index + 1 <= overId)
                                                    ?
                                                    'translate(0,-100%)'
                                                    :
                                                    (index + 1 < activeId && overId < activeId && index + 1 >= overId)
                                                        ?
                                                        'translate(0,100%)'
                                                        :
                                                        undefined
                                        }
                                    >
                                        <Draggable id={index + 1}>
                                            <List.Item >
                                                <div style={{ padding: '24px' }}>{item}</div>
                                            </List.Item>
                                        </Draggable>
                                    </Droppable>
                                </React.Fragment>
                        )
                    }

                </List>
            </DndContext>
        </div >
    )

}