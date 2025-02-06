import dbConnect from "@/lib/dbConnect";
import FormModel from "@/models/Form";
import UserModel from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = token.sub;

    const newForm = await FormModel.create({
      title: "Untitled Form",
      description: "",
      createdBy: userId,
      formFields: [],
    });

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { forms: newForm._id } },
      { new: true, upsert: false }
    );

    return Response.json(
      {
        success: true,
        message: "Form Created",
        id: newForm._id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating form", error);

    return Response.json(
      {
        success: false,
        message: "Error creating form",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = token.sub;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let response;

    if (id) {
      response = await FormModel.findOne({ _id: id, createdBy: userId });

      if (!response) {
        return Response.json(
          {
            success: false,
            message: "Form not found",
          },
          {
            status: 404,
          }
        );
      }
    } else {
      response = await FormModel.findOne({ createdBy: userId });
    }

    return Response.json(
      {
        success: true,
        message: id ? "Form found" : "Forms fetched successfully",
        form: response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error getting form", error);

    return Response.json(
      {
        success: false,
        message: "Error getting form",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const token = await getToken({ req: request as any });
    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = token.sub;
    const { id, title, description, formFields, isPublished } =
      await request.json();

    const updatedForm = await FormModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        formFields,
        createdBy: userId,
        isPublished,
      },
      { new: true }
    );

    if (!updatedForm) {
      return Response.json(
        {
          success: false,
          message: "Form not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Form updated",
        form: updatedForm,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating form", error);

    return Response.json(
      {
        success: false,
        message: "Error updating form",
      },
      {
        status: 500,
      }
    );
  }
}
