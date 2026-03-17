import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("p_a2bbd1f4_tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("p_a2bbd1f4_tasks")
      .insert(body)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const { data, error } = await supabase
      .from("p_a2bbd1f4_tasks")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    const { error } = await supabase
      .from("p_a2bbd1f4_tasks")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return NextResponse.json({ success: true }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}