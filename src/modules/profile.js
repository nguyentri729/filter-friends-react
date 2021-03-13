import _ from "lodash";
let userInfos = {};

async function graphQL(query, params) {
  const body = new FormData();
  body.append("fb_dtsg", userInfos.fbdtsg);
  body.append("q", query);
  _.each(params, (value, key) => {
    body.append(key, value);
  });

  const data = await fetch("https://www.facebook.com/api/graphql/", {
    method: "POST",
    credentials: "include",
    body: body,
  })
    .then((res) => res.json())
    .then((res) => _.get(res, userInfos.uid, res));

  return data;
}

async function getUserInfo() {
  const pageSource = await fetch(
    "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed"
  )
    .then((e) => e.text())
    .then((e) => {
      return e;
    });

  const uid = pageSource.match(/ACCOUNT_ID\\":\\"(.*?)\\"/);
  const name = pageSource.match(/NAME\\":\\"(.*?)\\"/);

  const accessToken = pageSource.match(/accessToken\\":\\"(.*?)\\"/);
  const fbdtsg = pageSource.match(/{\\"dtsg\\":{\\"token\\":\\"(.*?)\\"/);

  if (uid[1] && name[1]) {
    userInfos = {
      uid: uid[1],
      accessToken: accessToken[1],
      name: name[1],
      fbdtsg: fbdtsg[1],
    };
    return userInfos;
  }
  return null;
}

async function getFriends() {
  let friends = [];
  let after = "";
  let isNextPage = true;

  while (isNextPage) {
    const query = `node(${userInfos.uid}){friends.first(500).after(${after}){page_info,edges{node{id,mutual_friends{count},name}}}}`;
    const data = await graphQL(query);
    const friendEdges = _.get(data, "friends.edges", []);
    for (const edge of friendEdges) {
      friends.push(edge.node);
    }
    after = _.get(data, "friends.page_info.end_cursor");
    isNextPage = _.get(data, "friends.page_info.has_next_page", false);
  }
  return friends;
}

async function getInteractionPost(cursorPage = "") {
  const query = `node(${userInfos.uid}){timeline_feed_units.first(250).after(${cursorPage}){page_info,edges{node{id,creation_time,feedback{reactors{nodes{id}},commenters{nodes{id}}}}}}}`;
  return graphQL(query);
}

async function removeFriend(friendId = 4) {
  // return new Promise((resolve) => setTimeout(resolve, 1000));
  var a = new FormData();
  a.append("fb_dtsg", userInfos.fbdtsg);
  a.append("uid", friendId);
  a.append("__user", userInfos.uid);
  a.append("__a", 1);
  a.append("unref", "bd_friends_tab");

  const data = await fetch(
    "https://www.facebook.com/ajax/profile/removefriendconfirm.php",
    {
      method: "POST",
      credentials: "include",
      body: a,
    }
  )
    .catch(function () {
      return null;
    })
    .then((e) => e.text())
    .then((res) => {
      return res;
    });

  return /ACCOUNT_ID/.test(data);
}

export default {
  getFriends,
  getUserInfo,
  getInteractionPost,
  removeFriend,
};
