export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Articles",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/articles",
    },
    {
      title: "New Article",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/article",
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    },

  ];
}
