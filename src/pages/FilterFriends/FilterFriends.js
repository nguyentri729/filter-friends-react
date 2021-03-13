import React, { useState, useEffect } from "react";
import _ from "lodash";
import TableFilterFriend from "./components/TableFilterFriend";
import Loading from "./components/Loading";
import profile from "../../modules/profile";
import { Button } from "antd";

function FilterFriends() {
  // Mockdata here
  let defaultInteractionFriends = [];
  if (localStorage.getItem("interactionFriends"))
    defaultInteractionFriends = JSON.parse(
      localStorage.getItem("interactionFriends")
    );

  const [isLoading, setLoading] = useState(true);
  const [isScaning, setScaning] = useState(false);
  const [interactionFriends, setInteractionFriends] = useState(
    defaultInteractionFriends
  );
  const [friends, setFriends] = useState([]);

  let friendInteractionMap = {};

  function caculateInteractionCount(nodes, type) {
    for (const node of nodes) {
      const { id } = node;
      if (!friendInteractionMap[id]) {
        friendInteractionMap[id] = {
          reaction: 0,
          comment: 0,
        };
      }
      friendInteractionMap[id][type]++;
    }
  }

  async function getFriends() {
    await profile.getUserInfo();
    let friends = await profile.getFriends();
    setFriends(friends);
    setLoading(false);
  }

  async function scanInteractionFriends() {
    setScaning(true);
    let cursorNextPage = "";
    while (true) {
      const postsInteractions = await profile.getAllPostsInteractions(
        cursorNextPage
      );
      const edges = _.get(postsInteractions, "timeline_feed_units.edges", []);
      for (const edge of edges) {
        const node = edge.node;
        const { commenters, reactors } = node.feedback;
        caculateInteractionCount(commenters.nodes, "comment");
        caculateInteractionCount(reactors.nodes, "reaction");
      }
      const pageInfo = _.get(
        postsInteractions,
        "timeline_feed_units.page_info"
      );
      if (!pageInfo.has_next_page) break;
      cursorNextPage = pageInfo.end_cursor;
    }

    const interactionFriends = _.map(friends, (friend) => {
      const { reaction, comment } = _.get(friendInteractionMap, friend.id, {
        reaction: 0,
        comment: 0,
      });
      friend.reaction = reaction;
      friend.comment = comment;
      return friend;
    });
    // Mock data here
    localStorage.setItem(
      "interactionFriends",
      JSON.stringify(interactionFriends)
    );

    setInteractionFriends(interactionFriends);
    setScaning(false);
  }

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div style={{ margin: 50 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <center>
            <Button
              onClick={scanInteractionFriends}
              loading={isScaning}
              style={{ margin: "0 auto" }}
            >
              👀 Scan now
            </Button>
          </center>

          <TableFilterFriend data={interactionFriends} isScaning={isScaning} />
        </>
      )}
    </div>
  );
}

export default FilterFriends;
