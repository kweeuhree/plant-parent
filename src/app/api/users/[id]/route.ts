import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../../lib/connectToDb';
import User from '../../../models/User';

// Handle GET specific user requests
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id 
  console.log(id);

  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found'}, { status: 400});
  }

  return NextResponse.json({ success: true, data: user}, { status: 200});
}

// Handle PUT user requests
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id 
  console.log(id);

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!User) {
      return NextResponse.json({ success: false}, { status: 400});
      }

    return NextResponse.json({ success: true, data: user}, { status: 200});

    } catch (error) {
    return NextResponse.json({ success: false}, { status: 400});
  }
}

// Handle DELETE user requests
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id // 'a', 'b', or 'c'
  console.log(id);

  try {
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return NextResponse.json({ success: false}, { status: 400});
    }
    return NextResponse.json({ success: true, message: 'User delelted'}, { status: 200});

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 400});
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const {
//     query: { id },
//     method,
//   } = req;

//   await connectToDb();

  // switch (method) {
  //   case "GET" /* Get a model by its ID */:
  //     try {
  //       const user = await User.findById(id);
  //       if (!user) {
  //         return res.status(400).json({ success: false });
  //       }
  //       res.status(200).json({ success: true, data: user });
  //     } catch (error) {
  //       res.status(400).json({ success: false });
  //     }
  //     break;

    // case "PUT" /* Edit a model by its ID */:
    //   try {
    //     const user = await User.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     });
    //     if (!User) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: user });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;

//     case "DELETE" /* Delete a model by its ID */:
      // try {
      //   const deletedUser = await User.deleteOne({ _id: id });
      //   if (!deletedUser) {
      //     return res.status(400).json({ success: false });
      //   }
      //   res.status(200).json({ success: true, data: {} });
      // } catch (error) {
      //   res.status(400).json({ success: false });
      // }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }