class teacherHateoas {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }
  hateoas(id) {
    const structure = [
      {
        href: `${this.baseUrl}`,
        method: "GET",
        rel: "all_teacher",
      },
      {
        href: `${this.baseUrl}`,
        method: "POST",
        rel: "create_teacher",
      },

      {
        href: `${this.baseUrl}/${id}`,
        method: "GET",
        rel: "show_teacher",
      },
      {
        href: `${this.baseUrl}/${id}`,
        method: "PUT",
        rel: "update_teacher",
      },
      {
        href: `${this.baseUrl}/${id}`,
        method: "DELETE",
        rel: "delete_teacher",
      },
    ];
    return structure;
  }
}
module.exports = new teacherHateoas();
