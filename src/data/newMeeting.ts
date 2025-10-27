export const visitorFormData = [
  {
    title: "visitorInfoTitle",
    subTitle: "visitorInfoSubTitle",
    form: [
      {
        label: "name",
        input: [
          {
            type: "text",
            placeholder: "namePlaceholder",
            key: "name",
          },
        ],
      },
      {
        label: "phoneNumber",
        input: [
          { type: "text", placeholder: "phonePlaceholder", key: "phone" },
        ],
      },
      {
        label: "emailAddress",
        input: [
          { type: "email", placeholder: "emailPlaceholder", key: "email" },
        ],
      },
      {
        label: "numberOfAttendance",
        input: [
          {
            type: "number",
            placeholder: "numberOfAttendancePlaceholder",
            key: "numberOfAttendance",
          },
        ],
      },
    ],
    button: "next",
    navLink: "cancel",
  },
];

export const meetingFormData = [
  {
    title: "meetingDetailsTitle",
    subTitle: "meetingDetailsSubTitle",
    form: [
      {
        label: "meetingTitle",
        input: [
          {
            type: "text",
            placeholder: "Your Meeting Title",
            key: "title",
          },
        ],
      },
      {
        label: "Meeting Reasons & Goals",
        input: [
          {
            type: "text",
            placeholder: "mYour Goal & Causes Of The Meeting",
            key: "reasons",
          },
        ],
      },
      {
        label: "Meeting Importance",
        input: [
          {
            type: "text",
            placeholder: "Describe Your Meeting Importance?",
            key: "importance",
            maxLength: 30,
          },
        ],
      },
    ],
    attachments: {
      title: "Meeting Presentation (Optional)",
      subTitle: "Presentation\File You Want To View In The Meeting",
      uploadButtonText: "uploadFileButtonText",
      addLinkText: "addLinkButtonText",
      noFilesText: "noFilesUploadedText",
      form: [
        {
          label: "files",
          input: [
            {
              type: "file",
              multiple: true,
              key: "files",
              placeholder: "",
            },
          ],
        },
        {
          label: "links",
          input: [
            {
              type: "text",
              multiple: false,
              key: "links",
              placeholder: "linksAboutMeetingPlaceholder",
            },
          ],
        },
      ],
    },
    button: "next",
    navLink: "back",
  },
];

export const dateFormData = [
  {
    title: "preferedDateTimeTitle",
    subTitle: "preferedDateTimeSubTitle",
    button: "next",
    navLink: "back",
  },
];
