import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
      case 'GET':
        if (id) {
          // Obtener un producto por ID
          const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          return res.status(200).json({ data });
        } else {
          // Obtener todos los productos
          const { data, error } = await supabase
            .from('productos')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          return res.status(200).json({ data: data || [] });
        }

      case 'POST':
        // Crear nuevo producto
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { data: newData, error: createError } = await supabase
          .from('productos')
          .insert([body])
          .select()
          .single();

        if (createError) throw createError;
        return res.status(201).json({ data: newData });

      case 'PUT':
        // Actualizar producto
        if (!id) {
          return res.status(400).json({ error: 'ID requerido' });
        }

        const updateBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { data: updatedData, error: updateError } = await supabase
          .from('productos')
          .update(updateBody)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;
        return res.status(200).json({ data: updatedData });

      case 'DELETE':
        // Eliminar producto
        if (!id) {
          return res.status(400).json({ error: 'ID requerido' });
        }

        const { error: deleteError } = await supabase
          .from('productos')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
        return res.status(200).json({ message: 'Producto eliminado' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Método ${method} no permitido` });
    }
  } catch (error) {
    console.error('Error en API de productos:', error);
    return res.status(500).json({ error: error.message });
  }
}
