import React, { useEffect, useState } from 'react';
import { EventUI } from "./EventUI";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Relation, RelationType, UiEvent, Identifiable, isUiDCRGraph, State, isRelation } from 'types';
import { useToasts } from 'react-toast-notifications'
import { v4 as uuidv4 } from 'uuid';

import { ContextMenuTrigger } from "react-contextmenu";
import DesignerContextMenu from './DesignerContextMenu';
import "web/src/styling/react-contextmenu.css"
import { calculateArrowUsingAngles, calculateInitialAngle, getNewPosition } from '../helpers/Calculations';
import { RelationArrow } from './RelationArrow';
import BackButton from "../../Shared/Components/UIElements/BackButton";
import EventEditModal from "./EventEditModal";
import { ModelWrapper } from '../../Shared/Styling/LogPageStyling';

type DesignerProps = {
  state: State,
  setState: (state: State) => void;
  id: string | null;
  DesignerHeight: number,
}

const Designer = ({ setState, id , DesignerHeight, state}: DesignerProps) => {
  const { addToast } = useToasts();
  const [graphId, setGraphId] = React.useState<string>( id ? id : uuidv4() );
  const [events, setEvents] = React.useState<UiEvent[]>([]);
  const [count, setCount] = React.useState(0);
  const [relations, setRelations] = React.useState<Relation[]>([]);
  const [newRelations, setNewRelations] = React.useState<Relation[]>([]);
  const [isRelationDrawing, setIsRelationDrawing] = React.useState(0);
  const [selectedEventId, setSelectedEventId] = React.useState<string>("");
  const [selectedRelationId, setSelectedRelationId] = React.useState<string>("");
  const [selectedObject, setSelectedObject] = React.useState<any>(null);
  const [eventEditing, setEventEditing] = React.useState<UiEvent>();
  const [log, setLog] = useState<string | null>("");
  const [type, setType] = useState<string | null>("");

  var uniqid = require('uniqid');


  useEffect(() => {
    window.electron.listenToToast((msg: { msg: string, appearance: "success" | "error" }) => {
      const content = msg.msg;
      const appearance = msg.appearance;
      addToast(content, {
        appearance,
        autoDismiss: true
      });
    });
    return () => {
      window.electron.clearToastListener();
    }
  }, [addToast])

  useEffect(() => {
    window.electron.listenToGetGraph(() => {
      const graph = {
        id: graphId,
        events: events,
        relations: relations,
        type: type,
        log: log,
      }
      window.electron.sendGraph(JSON.stringify(graph));
    });
    window.electron.listenToShowGraph((graph: any) => {
      if (isUiDCRGraph(graph)) {
        setGraphId(graph.id);
        setEvents(graph.events);
        setRelations(graph.relations);
        setCount(graph.events.length + graph.relations.length);
        setNewRelations([]);
        setIsRelationDrawing(0);
        setSelectedObject(null);
        setLog(graph.log)
        setType(graph.type);
      }
    });
    return () => {
      window.electron.clearGraphListeners();
    }
  }, [events, relations, graphId, type, log]);

  const addEvent = (e: any) => {
    let stage = e.target.getStage();
    const event = {
      id: uniqid('event-'),
      name: "Event: " + count.toString(),
      description: "Description",
      show_in_graph: true,
      position: {
        x: stage.getPointerPosition().x,
        y: stage.getPointerPosition().y,
      },
      size: {
        height: 200,
        width: 100
      },
      is_enabled: false,
      is_executed: false,
      is_excluded: false,
      is_pending: false,
      isDragging: false,
      relationStart: [],
      relationEnd: []
    };

    setCount(
      count + 1
    );

    setEvents([...events, event]);
  }

  const removeEvent = (e: any) => {
    const id = e.target.parent.id();

    // Remove relations associated with the event.
    const { eventsCp } = removeEventRelations(id);
    removeElement(eventsCp, id);
    setEvents(eventsCp)
  };

  // Input the id of the event being removed
  // This returns all objects altered, and a copy of the events array that has (potentially) been altered
  // This is needed since setState is async, and we can't guarantee that it would finish at the bottom
  // of this function before we would like to use it again to remove the event
  const removeEventRelations = (id: string): {alteredObjects: Array<Relation | UiEvent>, eventsCp: Array<UiEvent> } => {
    const relationsCp = [...relations];
    const eventsCp = [...events];
    let relationsToRemove: string[] = [];
    let alteredEvents: UiEvent[] = [];
    relationsCp.forEach(function (relation) {
      if (relation.start_event_id === id) {
        relationsToRemove.push(relation.id);
        eventsCp.forEach((event) => {
          event.relationEnd.forEach(function (element, index) {
            if (element === relation.id) {
              alteredEvents.push(event);
              event.relationEnd.splice(index, 1);
            }
          });
        });


      }
      if (relation.end_event_id === id) {
        relationsToRemove.push(relation.id);
        eventsCp.forEach((event) => {
          event.relationStart.forEach(function (element, index) {
            if (element === relation.id) {
              alteredEvents.push(event);
              event.relationStart.splice(index, 1);
            }
          });
        });

      }
    });

    let relationsRemoved = relationsToRemove.map((id) => relationsCp.find((relation => relation.id === id)));
    const relationsRemovedFilter = relationsRemoved.filter((elem) => isRelation(elem)) as Array<Relation>;

    relationsToRemove.forEach((rel) => {
      removeElement(relationsCp, rel);
    })
    setRelations(relationsCp);
    return { alteredObjects: [...alteredEvents, ...relationsRemovedFilter], eventsCp }
  };

  // -------------- Comment ---------------
  // This function uses weird side effects. Consider refactoring
  //  -----------------------------         -Axel 07/06/2021
  const removeRelation = (e: any) => {
    const id = e.target.id();
    const localChanges: Array<{ object: UiEvent | Relation, removed: boolean }> = [];
    // Remove relation
    const relationsCp = [...relations];
    let remRelation = removeElement(relationsCp, id);
    setRelations(relationsCp);
    localChanges.push({object: remRelation, removed: true});
    const eventsCp = [...events];
    // Remove from start event's list of start relations
    let event = findElement(eventsCp, remRelation.start_event_id)
    removeElementFromArray(event.relationStart, remRelation.id)
    let newEvent = {...event};
    localChanges.push({object: newEvent, removed: false});

    // Remove from end event's list of end relations
    event = findElement(eventsCp, remRelation.end_event_id);
    removeElementFromArray(event.relationEnd, remRelation.id);
    newEvent = {...event};
    localChanges.push({object: newEvent, removed: false});
    
    setEvents(eventsCp);
  }

  function removeElement<T extends Relation | UiEvent>(someData: T[], id: string): T {
    let index = someData.findIndex((elem) => elem.id === id);
    let element = someData[index];
    if (index >= 0) {
      someData.splice(index, 1);
    }
    return element;
  }

  function removeElementFromArray(someData: string[], str: string) {
    let index = someData.findIndex((elem) => elem === str);
    if (index >= 0) {
      someData.splice(index, 1);
    }
  }

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setEvents(
      events.map((event) => {
        return {
          ...event,
          isDragging: event.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e: any) => {
    recalculateArrowLocations(e);
    setEvents(
      events.map((event) => {
        return {
          ...event,
          isDragging: false,
        };
      })
    );
  };

  const handleMouseDown = (relationType: RelationType, e: any) => {
    const NUMBER_OF_EVENTS_NEEDED = 1;
    if (isEvent(e) && events.length >= NUMBER_OF_EVENTS_NEEDED) {
      if (newRelations.length === 0) {
        const newRelation: Relation = {
          id: uniqid('relation-'),
          start_position: {
            x: e.target.parent.x() + e.target.parent.width() / 2,
            y: e.target.parent.y() + e.target.parent.height() / 2,
          },
          start_angle: 180,
          end_position: {
            x: e.target.parent.x() + e.target.parent.width() / 2,
            y: e.target.parent.y() + e.target.parent.height() / 2,
          },
          start_event_id: e.target.parent.id().toString(),
          end_event_id: e.target.parent.id().toString(),
          end_angle: 180,
          type: relationType
        };
        setNewRelations([newRelation]);

        // start rectangle
        const cpEvents = [...events];
        let event = findElement(cpEvents, e.target.parent.id());
        event.relationStart.push(newRelation.id);
        setEvents(cpEvents);
      }
    }
  };

  const handleMouseUp = (e: any) => {
    if (isEvent(e)) {
      if (newRelations.length === 1) {
        const relationToAdd: Relation = {...newRelations[0]};
        relationToAdd.end_event_id = e.target.parent.id();
        let startEvent = findElement(events, relationToAdd.start_event_id);
        let endEvent = findElement(events, relationToAdd.end_event_id);
        if (startEvent.id !== endEvent.id) {
          relationToAdd.start_angle = calculateInitialAngle(startEvent, endEvent)[0];
          relationToAdd.end_angle = calculateInitialAngle(startEvent, endEvent)[1];
          let new_angles = iterate(startEvent, endEvent, relationToAdd.start_angle, relationToAdd.end_angle);
          relationToAdd.start_angle = new_angles.start;
          relationToAdd.end_angle = new_angles.end;
          let points = calculateArrowUsingAngles(startEvent, endEvent, relationToAdd);
          relationToAdd.start_position.x = points[0];
          relationToAdd.start_position.y = points[1];
          relationToAdd.end_position.x = points[2];
          relationToAdd.end_position.y = points[3];
        } else {
          relationToAdd.start_position.x = startEvent.position.x;
          relationToAdd.start_position.y = startEvent.position.y;
          relationToAdd.end_position.x = startEvent.position.x;
          relationToAdd.end_position.y = startEvent.position.y;
        }
        const localChanges: Array<{object: UiEvent | Relation, removed: boolean}> = [];
        const relationsCp = [...relations];
        relationsCp.push(relationToAdd);
        setNewRelations([]);
        setRelations(relationsCp);
        setIsRelationDrawing(0);
        localChanges.push({object: relationToAdd, removed: false});
        // end rectangle
        const cpEvents = [...events];
        let event = findElement(cpEvents, e.target.parent.id());
        event.relationEnd.push(relationToAdd.id);
        setEvents(cpEvents);
        localChanges.push({object: event, removed: false});

      }
    }
  };


  function iterate(start_event: any, end_event: any, start_angle_new: number, end_angle_new: number): any {
    let changeMade = false;
    relations.forEach((relation) => {
      if (relation.start_event_id === start_event.id && relation.end_event_id === end_event.id) {
        //Same direct arrow between same events
        if (relation.start_angle === start_angle_new) {
          //Same start angle
          start_angle_new = start_angle_new + 15;
          changeMade = true;

        }
        if (relation.end_angle === end_angle_new) {
          //Same start angle
          end_angle_new = end_angle_new - 15;
          changeMade = true;
        }
      }
      else if (relation.end_event_id === start_event.id && relation.start_event_id === end_event.id) {
        //Same direct arrow between same events
        if (relation.start_angle === end_angle_new && relation.end_angle === start_angle_new) {
          //Same start angle
          start_angle_new = start_angle_new + 15;
          end_angle_new = end_angle_new - 15;
          changeMade = true;

        }
      }


    });
    if (changeMade) {
      return iterate(start_event, end_event, start_angle_new, end_angle_new);
    }
    return { start: start_angle_new, end: end_angle_new };
  };
  const handleMouseMove = (e: any) => {
    if (newRelations.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newRelation = {...newRelations[0]};
      newRelation.end_position.x = x;
      newRelation.end_position.y = y;
      setNewRelations([newRelation]);
    }
  };

  const createRelation = (relationType: RelationType, e: any) => {
    const NUMBER_OF_EVENTS_NEEDED = 1;
    if (isEvent(e) && events.length >= NUMBER_OF_EVENTS_NEEDED) {
      if (isRelationDrawing === 0) {
        setIsRelationDrawing(isRelationDrawing + 1);
        handleMouseDown(relationType, e);
      }
      else if (isRelationDrawing === 2) {
        setIsRelationDrawing(0);
      }
    }
  }

  function findElement<T extends Identifiable>(someData: T[], id: string): T {
    const retval = someData.find(element =>
      element.id === id);
    if (!retval) {
      throw new Error("Graph Desynchronization Error");
    }
    return retval
  }

  // little helper function
  function isEvent(e: any) {
    return e.target.className === Rect || (e.target.className === Text && e.target.parent.children[0].className === Rect)
  }

  const openEventEditModal = (e: any) => {
    const cpEvents = [...events];
    const cpEvent = findElement(cpEvents, e.target.parent.id());

    // modal is open when eventEditing !== undefined
    setEventEditing(cpEvent);
  }

  const closeEventEditModal = (id: string, name: string, description: string) => {
    // no parameters are passed when cancel is clicked
    if (id !== undefined) {
      const cpEvents = [...events];
      const cpEvent = findElement(cpEvents, id);
      cpEvent.name = name;
      cpEvent.description = description;
      setEvents(cpEvents);
    }

    // modal closes when eventEditing === undefined
    setEventEditing(undefined);
  }

  // stores new dimensions and size of an event after transform + recalculates the arrow position
  const updateOnEventResize = (e: any, dimensions: any) => {
    const id = e.target.id();
    const cpEvents = [...events];

    const cpEvent = removeElement(cpEvents, id);
    // update event points
    cpEvent.position.x = dimensions.x;
    cpEvent.position.y = dimensions.y;
    cpEvent.size.height = dimensions.height;
    cpEvent.size.width = dimensions.width;
    cpEvents.push(cpEvent);
    recalculateArrowLocations(e);
    setEvents(cpEvents);
  }

  const updatePoints = (e: any) => {
    const id = e.target.id();
    const cpEvents = [...events];

    const cpEvent = findElement(cpEvents, id);
    // update event points
    cpEvent.position.x = e.target.x();
    cpEvent.position.y = e.target.y();

    recalculateArrowLocations(e);
    setEvents(cpEvents);
  }

  function onRelationDragEnd(e: any) {
    const relationsCp = [...relations];
    let relId = e.currentTarget.attrs.id.split(".")[0];
    let position = e.currentTarget.attrs.id.split(".")[1];
    let relation = findElement(relationsCp, relId);
    let start_event = findElement(events, relation.start_event_id);
    let end_event = findElement(events, relation.end_event_id);
    let circleCoord = { x: e.currentTarget.attrs.x, y: e.currentTarget.attrs.y };

    if (position === "start") {
      let points = getNewPosition(start_event, circleCoord);
      relation.start_position.x = points.x;
      relation.start_position.y = points.y;
      relation.start_angle = points.angle;
    }
    else {
      let points = getNewPosition(end_event, circleCoord);
      relation.end_position.x = points.x;
      relation.end_position.y = points.y;
      relation.end_angle = points.angle;
    }

    setRelations(relationsCp);
  }

  const recalculateArrowLocations = (e: any) => {
    const id = e.target.id();
    const cpRelations = [...relations];
    const event = findElement(events, id);
    const localChanges: Array<{object: Event | Relation, removed: boolean}> = [];
    // update relation points
    event.relationStart.forEach((relationID: string) => {
      let relation = findElement(cpRelations, relationID);
      let endEvent = findElement(events, relation.end_event_id);
      if (event.id === endEvent.id) {
        relation.start_position.x = event.position.x;
        relation.start_position.y = event.position.y;
        relation.end_position.x = event.position.x;
        relation.end_position.y = event.position.y;
      } else {
        let points = calculateArrowUsingAngles(event, endEvent, relation);
        relation.start_position.x = points[0];
        relation.start_position.y = points[1];
        relation.end_position.x = points[2];
        relation.end_position.y = points[3];
      }
      localChanges.push({object: relation, removed: false});
    });
    event.relationEnd.forEach((relationID: string) => {
      let relation = findElement(cpRelations, relationID);
      let startEvent = findElement(events, relation.start_event_id);
      if (event.id !== startEvent.id) {
        let points = calculateArrowUsingAngles(startEvent, event, relation);
        relation.start_position.x = points[0];
        relation.start_position.y = points[1];
        relation.end_position.x = points[2];
        relation.end_position.y = points[3];
        localChanges.push({object: relation, removed: false});
      }
    });
    
    setRelations(cpRelations);
    return localChanges;
  }

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedEventId("");
      setSelectedRelationId("");
    }
  };

  const ChangeMarking = (marking: string, e: any) => {
    const cpEvents = [...events];
    let event = findElement(cpEvents, e.target.parent.id());
    switch (marking) {
      case "Executed":
        event.is_executed = !event.is_executed;
        break;
      case "Pending":
        event.is_pending = !event.is_pending;
        break;
      case "Included":
        event.is_excluded = !event.is_excluded;
        break;
      default:
        return
    }
    setEvents([...cpEvents]);

  }

  return (
    <ModelWrapper>
      <BackButton onClick={() => setState({pages:"LandingPage", log:state.log, workspacePath: state.workspacePath})} />
      <ContextMenuTrigger id="contextmenu" holdToDisplay={-1}>
        <Stage width={window.innerWidth} height={DesignerHeight}
          onMouseUp={handleMouseUp}
          onClick={checkDeselect}
          onMouseMove={handleMouseMove}
          onContextMenu={setSelectedObject}>
          <Layer>
            {relations.map((relation) => (
              <RelationArrow
                key={relation.id}
                relationProps={relation}
                isRelationSelected={relation.id === selectedRelationId}
                onSelect={() => {
                  setSelectedRelationId(relation.id);
                }}
                onRelationDragEnd={onRelationDragEnd}
              />
            ))}
            {newRelations.map((relation) => (
              <RelationArrow key={relation.id} relationProps={relation}

              />
            ))}
            {events.map((event, i) => {
              return (
                <EventUI
                  key={event.id}
                  eventProps={event}
                  isSelected={event.id === selectedEventId}
                  onDragMove={updatePoints}
                  onSelect={() => {
                    setSelectedEventId(event.id);
                  }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onChange={(newAttrs: UiEvent) => {
                    const changeEvents = events.slice();
                    changeEvents[i] = newAttrs;
                  }}
                  onTransformEndDes={updateOnEventResize}
                />
              );
            })}
          </Layer>
        </Stage>
      </ContextMenuTrigger>
      <DesignerContextMenu
        selectedObject={selectedObject}
        isEvent={isEvent}
        createRelation={createRelation}
        editEvent={openEventEditModal}
        removeEvent={removeEvent}
        changeMarking={ChangeMarking}
        addEvent={addEvent}
        removeRelation={removeRelation}
      />
      {eventEditing !== undefined && (
        <EventEditModal 
          handleClose={closeEventEditModal}
          eventEditing={eventEditing}
          />
      )}
    </ModelWrapper>
  );
};

export default Designer;
