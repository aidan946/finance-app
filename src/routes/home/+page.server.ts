import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    redirect(303, '/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`amount`)
    .eq('id', session.user.id)
    .single()

  const { data: transactions } = await supabase
    .from('transactions')
    .select(`name, category, amount`)
    .eq('user_id', session.user.id)

  return { session, profile, transactions }
}) satisfies PageServerLoad

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string
    const website = formData.get('website') as string
    const avatarUrl = formData.get('avatarUrl') as string

    const session = await getSession()

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      full_name: fullName,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    })

    if (error) {
      return fail(500, {
        fullName,
        username,
        website,
        avatarUrl,
      })
    }

    return {
      fullName,
      username,
      website,
      avatarUrl,
    }
  },
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (session) {
      await supabase.auth.signOut()
      redirect(303, '/');
    }
  },
} satisfies Actions

