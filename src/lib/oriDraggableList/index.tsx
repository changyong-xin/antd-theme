

import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from "react";

interface IOriDraggableList<T> {
    rowKey: keyof T;
    listData: T[];
    render: (item: T, index: number) => React.ReactNode;
    onChange?: (listData: T[]) => void;
}

interface IOriDraggableListChildren {
    id: string | number;
    children?: React.ReactNode;
}


function SortableItem(props: IOriDraggableListChildren) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });
    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transform ? transition : undefined,
                cursor: 'move',
                ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
            }}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );
}


export function OriDraggableList<T = any>(props: IOriDraggableList<T>) {
    const [list, setList] = useState(props.listData);
    return (
        <div style={{ overflow: "hidden", width: "100%", height: '100%' }}>
            <DndContext
                sensors={useSensors(
                    useSensor(PointerSensor, {
                        activationConstraint: {
                            distance: 1,
                        },
                    }),
                )}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={(e) => {
                    if (e.over && (e.over?.id !== e.active.id)) {
                        const activeIndex = list.findIndex((i) => i[props.rowKey] === e.active.id);
                        const overIndex = list.findIndex((i) => i[props.rowKey] === e.over?.id);
                        const result = arrayMove(list, activeIndex, overIndex)
                        setList(result);
                        if (props.onChange) {
                            props.onChange(result)
                        }
                    }
                }}
            >
                <SortableContext items={list.map((item, index) => item[props.rowKey] as any)} strategy={verticalListSortingStrategy} >
                    {
                        list.map(
                            (item, index) =>
                                <SortableItem id={item[props.rowKey] as any} key={index}>
                                    {props.render(item, index)}
                                </SortableItem>
                        )
                    }
                </SortableContext>
            </DndContext>
        </div >
    )

}